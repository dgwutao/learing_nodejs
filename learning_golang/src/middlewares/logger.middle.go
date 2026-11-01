package middlewares

import (
	"time"
	"github.com/gin-gonic/gin"
	"learning_golang/src/utils"
)

func ErrorLog() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		c.Next()

		status := c.Writer.Status()
		if status < 400 {
			return // 正常请求，不记录
		}

		attrs := []any{
			"method",     c.Request.Method,
			"path",       c.Request.URL.Path,
			"query",      c.Request.URL.RawQuery,
			"status",     status,
			"latency_ms", time.Since(start).Milliseconds(),
			"client_ip",  c.ClientIP(),
			"user_agent", c.Request.UserAgent(),
		}

		if rid, ok := c.Get("request_id"); ok {
			attrs = append(attrs, "request_id", rid)
		}

		if len(c.Errors) > 0 {
			attrs = append(attrs, "errors", c.Errors.String())
		}

		if status >= 500 {
			utils.GetLogger().Error("request failed", attrs...)
		} else {
			utils.GetLogger().Warn("request failed", attrs...)
		}
	}
}