package utils

import (
	"crypto/tls"
	"net"
	"net/http"
	"time"
	"sync"
	"net/http/httputil"
	"net/url"
	"github.com/gin-gonic/gin"
)

func srvProxy() {
	r := gin.New()
	r.Use(gin.Recovery()) // 兜底 panic，防止单个请求打挂整个进程

	// 健康检查走原生 ServeMux，绕过 Gin 路由，实测可提升吞吐[reference:17]
	// 但放在 Gin 里也完全可以，这里为简化统一用 Gin
	r.GET("/healthz", func(c *gin.Context) {
		c.Status(http.StatusOK)
	})

	// 解析上游地址（生产环境应从配置/服务发现加载，此处硬编码示意）
	orderURL, _ := url.Parse("http://order-service:8080")

	// 全局复用的 ReverseProxy
	orderProxy := NewUpstreamProxy(orderURL)

	// 业务路由组：中间件链 + 代理 Handler
	api := r.Group("/api/orders")
	// api.Use(
		// RequestIDMiddleware(),             // 注入 X-Request-Id
		// RateLimitMiddleware(...),       // 限流（按需插入）
		// AuthMiddleware(...),            // 认证（如需要，也可在 Nginx auth_request 后）
	// )
	api.Any("/*path", func(c *gin.Context) {
		// 关键：直接复用全局 proxy，不在每次请求中新建
		orderProxy.ServeHTTP(c.Writer, c.Request)
	})

	// 配置 http.Server 的超时（与 Transport 超时协同）
	// srv := &http.Server{
	// 	Addr:    ":9000",
	// 	Handler: r,
		// 注意：Server 的 ReadTimeout/WriteTimeout 不覆盖反向代理的下游通信[reference:18]
		// 它们只约束"客户端 ↔ 网关"这一段。下游超时由 Transport 独立控制。
	// 	ReadHeaderTimeout: 5 * time.Second,
	// 	IdleTimeout:       120 * time.Second,
	// }
	// _ = srv.ListenAndServe()
}

func newTransport() *http.Transport {
	return &http.Transport{
		// 建连阶段
		DialContext: (&net.Dialer{
			Timeout:   3 * time.Second,  // 建立 TCP 连接的超时
			KeepAlive: 30 * time.Second, // TCP keepalive 探测间隔
		}).DialContext,
		TLSHandshakeTimeout: 5 * time.Second, // TLS 握手超时，默认 10s 可适当缩短

		// 连接池容量——最关键的调优点
		MaxIdleConns:        2000, // 全局最大空闲连接数，默认 100，推荐 500–2000[reference:3]
		MaxIdleConnsPerHost: 500,  // 单 host 空闲连接数，默认仅 2（极低！），生产推荐 ≥300[reference:4]
		MaxConnsPerHost:     0,    // 0 表示不限制每 host 总连接数，由 MaxIdleConnsPerHost 控制复用

		// 连接生命周期
		IdleConnTimeout: 90 * time.Second, // 空闲连接回收时间，默认 0（永不过期！）[reference:5]

		// 响应阶段超时（注意：这约束的是"从发送请求到收到响应头"的窗口）
		ResponseHeaderTimeout: 10 * time.Second, // 后端处理慢时的第一道拦截，默认 0（永不超时）[reference:6]

		// 其他
		ExpectContinueTimeout: 1 * time.Second,
		ForceAttemptHTTP2:     true, // 如果后端支持 HTTP/2，保持开启；如需严格连接数可控可关闭
		// 生产环境务必不要设置 InsecureSkipVerify: true[reference:7]
		TLSClientConfig: &tls.Config{MinVersion: tls.VersionTLS12},
	}
}

const bufferSize = 32 * 1024 // 与 ReverseProxy 默认值对齐

type bufferPool struct {
	pool sync.Pool
}

func newBufferPool() *bufferPool {
	return &bufferPool{
		pool: sync.Pool{
			New: func() interface{} {
				b := make([]byte, bufferSize)
				return &b
			},
		},
	}
}

func (p *bufferPool) Get() []byte {
	return *(p.pool.Get().(*[]byte))
}

func (p *bufferPool) Put(b []byte) {
	// 只回收容量足够的切片，避免小切片污染池子
	if cap(b) >= bufferSize {
		p.pool.Put(&b)
	}
}

// NewUpstreamProxy 创建一个可全局复用的 ReverseProxy
// target 是后端服务的 base URL，例如 http://order-service:8080
func NewUpstreamProxy(target *url.URL) *httputil.ReverseProxy {
	proxy := &httputil.ReverseProxy{
		Transport: newTransport(), // 全局共享的 Transport
		BufferPool: newBufferPool(),

		// Rewrite 是 Go 1.20+ 推荐的请求改写钩子，替代已废弃的 Director
		Rewrite: func(pr *httputil.ProxyRequest) {
			pr.SetURL(target) // 设置目标 scheme/host/path
			pr.SetXForwarded() // 自动正确设置 X-Forwarded-For/Proto/Host

			// 透传或注入自定义 Header（示例）
			// pr.Out.Header.Set("X-Gateway", "go-gin-proxy")
		},

		// 统一错误处理：后端不可达、超时、连接重置等都会走到这里
		ErrorHandler: func(w http.ResponseWriter, r *http.Request, err error) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			_, _ = w.Write([]byte(`{"error":"upstream unavailable","code":502}`))
			// 生产环境应在这里记录结构化日志（包含 request_id、upstream、error）
		},

		// 可选：FlushInterval 控制流式响应的刷新频率
		// 对于 SSE 等场景，设置为 -1 表示立即刷新
		FlushInterval: 100 * time.Millisecond,
	}
	return proxy
}