package main

import (
	"net"
	"os"
	"context"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"
	"learning_golang/src/repos"
)

func main() {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	engine := buildApp()
	port := os.Getenv("PORT")
	server := &http.Server{
		Addr:":" + port,
		Handler:engine,
		ReadTimeout:10 * time.Second,
		WriteTimeout:10 * time.Second,
		IdleTimeout:120 * time.Second,
		ReadHeaderTimeout:5 * time.Second,
		ConnState: func(conn net.Conn, state http.ConnState) {
			// 每当连接状态变化时，这个函数会被调用
			// log.Printf("连接 %v 状态变为: %v", conn.RemoteAddr(), state)
		},
	}

	// Initializing the server in a goroutine so that
	// it won't block the graceful shutdown handling below
	go func() {
		log.Println("server listening on port: " + port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	// Listen for the interrupt signal.
	<-ctx.Done()

	// Restore default behavior on the interrupt signal and notify user of shutdown.
	stop()
	log.Println("shutting down gracefully, press Ctrl+C again to force")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	if err := server.Shutdown(ctx); err == nil {
		log.Println("Http serve is shutdown already gracefully")
	}else {
		log.Println("Server forced to shutdown: ", err)
	}

	if repos.RDB != nil {
		if err := repos.RDB.Close(); err != nil {
			log.Printf("Redis connections close failed: %v", err)
		} else {
			log.Println("Redis connections closed")
		}
	}

	if repos.SQLDB != nil {
		if err := repos.SQLDB.Close(); err != nil {
			log.Printf("Database connections close failed: %v", err)
		} else {
			log.Println("Database connections closed already")
		}	
	}
	

	log.Println("Server exiting")
}
