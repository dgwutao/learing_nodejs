package middlewares

import (
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
)

func LoadToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    401,
				"message": "缺少 Authorization 请求头",
			})
			return
		}
		
		parts := strings.Fields(auth)
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    40101,
				"message": "Authorization 格式应为 Bearer <token>",
			})
			return
		}

		token := parts[1]
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"code":    40102,
				"message": "token 为空",
			})
			return
		}

		// 把用户信息挂到 Context，供后续 Handler 使用
		c.Set("$token", token)
		c.Next()
	}
}