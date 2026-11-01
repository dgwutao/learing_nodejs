package main

import (
	"os"
	"log"
	"learning_golang/src/routes"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"learning_golang/src/middlewares"
	"github.com/danielkov/gin-helmet/ginhelmet"
	// "learning_golang/src/repos"
)

func buildApp() *gin.Engine{
	if err := godotenv.Load("../.env.example"); err != nil {
		log.Println("未找到 .env.example，使用系统环境变量")
	}

	ginMode := os.Getenv("GIN_MODE");
	if ginMode == "" {
        ginMode = "debug"
    }
	
	// if err := repos.InitDB(); err != nil {
	// 	log.Fatalf("Database connect failed: %v", err)
	// }else {
	// 	log.Println("Database connected successfully")
	// }
	// repos.InitRDB()
	gin.SetMode(ginMode)
	r := gin.New()
	r.RedirectTrailingSlash = true       
	r.RedirectFixedPath = false        
	r.HandleMethodNotAllowed = true     
	r.ContextWithFallback = false       
	r.Use(middlewares.ErrorLog())  
	r.Use(gin.Logger(), gin.Recovery())
	if err := r.SetTrustedProxies([]string{"127.0.0.1"}); err != nil {
		log.Fatalf("set trusted proxies failed: %v", err)
	}
	r.Use(middlewares.CORSMiddleware())
	r.Use(ginhelmet.Default())
	
	r.Static("/static", "./static")
	routes.SetupRoutes(r)

	return r
}