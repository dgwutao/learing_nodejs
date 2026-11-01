package routes

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(engine *gin.Engine) *gin.RouterGroup{
	engine.GET("/favicon.ico", func(c *gin.Context) {
		c.Status(http.StatusNoContent) 
	})
	
	rg := engine.Group("/api")
	// v1 := api.Group("/v1")
	addIndexRoutes(rg)
	addHealthRoutes(rg)

	engine.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"Code": 404, 
			"Message": "路由不存在: " + c.Request.URL.Path})
	})

	engine.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{
			"Code": 405, 
			"Message": "方法不允许: "+c.Request.URL.Path})
	})
	return rg
}
