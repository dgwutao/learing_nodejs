package middlewares

import (
	"time"
	"log"
	"github.com/gin-gonic/gin"
)

func TimingMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()        
        c.Next()                   
        latency := time.Since(start) 
        log.Printf("路径 %s 耗时 %v msg from middleware", c.Request.URL.Path, latency)

		// c.Abort()
    }
}