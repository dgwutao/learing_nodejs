package utils

import (
	"io"
	"log/slog"
	"os"
	"path/filepath"
	"sync"
	"gopkg.in/natefinch/lumberjack.v2"
)

var (
	loggerIns     *slog.Logger
	loggerInsOnce sync.Once
)

func GetLogger() *slog.Logger {
	loggerInsOnce.Do(func() {
		loggerIns = newLogger()
	})
	return loggerIns
}

func newLogger() *slog.Logger {
	wd, _ := os.Getwd()
	logPath := filepath.Join(wd, "..", "logs", "error.log")
	rotator := &lumberjack.Logger{
		Filename:   logPath,  // 例如 /var/log/myapp/error.log
		MaxSize:    100,      // 单文件 100MB
		MaxBackups: 10,       // 最多保留 10 个
		MaxAge:     30,       // 保留 30 天
		Compress:   true,     // 旧文件 gzip
		LocalTime:  true,
	}

	multi := io.MultiWriter(os.Stdout, rotator)

	return slog.New(slog.NewJSONHandler(multi, &slog.HandlerOptions{
		Level: slog.LevelWarn,
	}))
}