package middlewares

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Allow requests from any origin.
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		// Allowed HTTP methods.
		c.Writer.Header().
			Set("Access-Control-Allow-Methods", "POST, GET")

		// Allowed headers.
		c.Writer.Header().
			Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

		// Allow credentials (cookies, auth headers, etc.).
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight OPTIONS request.
		if c.Request.Method == "OPTIONS" {
			// Cache preflight response for 24 hours.
			c.Writer.Header().Set("Access-Control-Max-Age", "86400")

			// Return 204 No Content for preflight.
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		// Pass control to the next middleware/handler.
		c.Next()
	}
}

func SecurityHeaders() gin.HandlerFunc {
  return func(c *gin.Context) {
    c.Header("X-Frame-Options", "DENY")
    c.Header("X-Content-Type-Options", "nosniff")
    c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
    c.Header("Content-Security-Policy", "default-src 'self'")
    c.Header("Referrer-Policy", "strict-origin")
    c.Header("Permissions-Policy", "geolocation=(), camera=(), microphone=()")
    c.Next()
  }
}


// type AppError struct {
//     Status  int
//     Code    int
//     Message string
//     Err     error   
// }

// func (e *AppError) Error() string { return e.Message }
// func (e *AppError) Unwrap() error { return e.Err }


// func ErrorHandler(logger *slog.Logger) gin.HandlerFunc {
//     return func(c *gin.Context) {
//         c.Next()   // 先执行后续 Handler

//         if len(c.Errors) == 0 {
//             return
//         }

//         err := c.Errors.Last().Err

//         // 已经是 AppError：按它携带的状态码和消息返回
//         var appErr *AppError
//         if errors.As(err, &appErr) {
//             if appErr.Err != nil {
//                 logger.Error("业务错误", "path", c.Request.URL.Path, "err", appErr.Err)
//             }
//             c.JSON(appErr.Status, gin.H{"code": appErr.Code, "message": appErr.Message})
//             return
//         }

//         // 未知错误：一律 500，细节只进日志
//         logger.Error("未处理错误",
//             "path", c.Request.URL.Path,
//             "err", err,
//             "stack", string(debug.Stack()),
//         )
//         c.JSON(http.StatusInternalServerError, gin.H{
//             "code":    50000,
//             "message": "服务器内部错误",
//         })
//     }
// }