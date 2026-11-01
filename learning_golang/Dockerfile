# ========== 构建阶段 ==========
FROM golang:1.27-alpine AS build

WORKDIR /app

# 先复制 go.mod / go.sum，利用 Docker 层缓存：
# 依赖不变时，go mod download 这一层直接复用，不重新下载
COPY go.mod go.sum ./
RUN go mod download

# 再复制源码
COPY . .

# 静态编译：CGO_ENABLED=0 保证不依赖 glibc，能在 alpine/scratch 里跑
# -ldflags="-s -w" 去掉调试信息，减小体积
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-s -w" -o /app/server ./src

# ========== 运行阶段 ==========
FROM alpine:3.20

# 时区数据（如果代码里用 loc=Local 连 MySQL，必须有）
# ca-certificates：如果有 HTTPS 外部调用
RUN apk add --no-cache ca-certificates tzdata \
    && addgroup -S app && adduser -S app -G app

WORKDIR /app

# 从构建阶段复制二进制
COPY --from=build /app/server /app/server

# 如果模板和静态资源是外部文件（不是 go:embed 嵌入的），一起复制
COPY --from=build /app/templates /app/templates
COPY --from=build /app/dist/static /app/static

# 非 root 用户运行
USER app

# 默认端口，运行时可用 -e PORT=xxxx 覆盖
ENV PORT=8080 \
    GIN_MODE=release \
    TZ=Asia/Shanghai

EXPOSE 8080

# 健康检查：容器内用 wget 探 /health（alpine 自带 busybox wget）
HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:${PORT}/health || exit 1

# 关键：必须用 exec 形式（JSON 数组），否则信号发不到 Go 进程
ENTRYPOINT ["/app/server"]