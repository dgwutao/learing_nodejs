package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"learning_golang/src/repos"
	"context"
)

func addHealthRoutes (rg *gin.RouterGroup){
	route := rg.Group("/health")

	route.GET("/", health)

	// route.GET("/user", middlewares.TimingMiddleware(), handlers.User)
}

func health(c *gin.Context) {
	checks := gin.H{"app": "ok"}

	if repos.DB != nil {
		if err := repos.DB.Raw("SELECT 1").Error; err != nil { 
			checks["mysql"] = "fail" 
		}else {
			checks["mysql"] = "ok" 
		}
	}
	
	if repos.RDB != nil {
		if err := repos.RDB.Ping(context.Background()).Err(); err != nil {
        	checks["redis"] = "fail" 
		}else {
			checks["redis"] = "ok"
		}
	}

	allOK := true
	for _, v := range checks {
		if v != "ok" {
			allOK = false
		}
	}

	status := http.StatusOK
	if !allOK {
		status = http.StatusServiceUnavailable
	}
	c.JSON(status, gin.H{"status": map[bool]string{true: "ok", false: "degraded"}[allOK], "checks": checks})
}