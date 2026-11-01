package repos

import (
    "context"
    "log"
    "os"
    "time"
	"errors"
	"encoding/json"
    "github.com/redis/go-redis/v9"
)

var RDB *redis.Client

func InitRDB() {
    RDB = redis.NewClient(&redis.Options{
        Addr:         os.Getenv("REDIS_ADDR"), // 不要硬编码 "localhost:6379"
        Password:     os.Getenv("REDIS_PASSWORD"),
        DB:           0,
        PoolSize:     30,                      // 必须显式配置，见下文
        MinIdleConns: 5,                       // 避免冷启动频繁建连
        DialTimeout:  2 * time.Second,         // 建连超时
        ReadTimeout:  500 * time.Millisecond,  // 读超时
        WriteTimeout: 500 * time.Millisecond,  // 写超时
    })

    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()
    if err := RDB.Ping(ctx).Err(); err != nil {
        log.Fatalf("Redis connected failed: %v", err)
    }
    log.Println("Redis connected successfully")
}

func RDBGet(key string, dst interface{}) error {
	raw, err := RDB.Get(context.Background(), key).Bytes()
	if err != nil {
		if errors.Is(err, redis.Nil) {
			return errors.New("cache not found")
		}
		return err
	}
	return json.Unmarshal(raw, dst)
}

func RDBSet(key string, val interface{}, ttl time.Duration) error {
	raw, err := json.Marshal(val)
	if err != nil {
		return err
	}
	return RDB.Set(context.Background(), key, raw, ttl).Err()
}

func RDBDelete(keys ...string) error {
	if len(keys) == 0 {
		return nil
	}
	return RDB.Del(context.Background(), keys...).Err()
}