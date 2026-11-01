package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"learning_golang/src/handlers"
	"learning_golang/src/middlewares"
)

func addIndexRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/index")

	route.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, "index")
	})

	route.GET("/user", middlewares.TimingMiddleware(), handlers.User)
}
