package utils

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"sync"
	"time"
	"errors"
	// ...
)

var (
	cacheIns     *memoryCache
	cacheInsOnce sync.Once
	initInterval = 5 * time.Minute
	DEFAULT_PREFIX = "cache:"
)

// RandomKey 生成一个带前缀的随机 key。
// 格式：<prefix>:<32 位十六进制随机串>，例如 "session:a1b2c3d4..."
// n 是随机字节数，推荐 16（即 32 位 hex，128 位熵）。
// n 最小为 8，低于 8 时按 8 处理（64 位熵是下限）。
func RandomKey() (string, error) {
	n := 16
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("generate random key: %w", err)
	}
	return DEFAULT_PREFIX + hex.EncodeToString(b), nil
}

// MustRandomKey 是 RandomKey 的 panic 版本，适合在启动期或确定不会失败的场景使用。
// 运行时生成 key 应优先用 RandomKey 并处理错误。
func MustRandomKey(prefix string, n int) string {
	k, err := RandomKey()
	if err != nil {
		panic(err)
	}
	return k
}

// entry 用 interface{} 存储任意类型的值
type entry struct {
	value    interface{}
	expireAt time.Time // 零值表示永不过期
}

// memoryCache 是单例的内部实现，本身不是泛型
type memoryCache struct {
	mu       sync.RWMutex
	items    map[string]entry
	stopCh   chan struct{}
	stopOnce sync.Once
}

func Init(cleanupInterval time.Duration) {
	cacheInsOnce.Do(func() {
		if cleanupInterval > 0 {
			initInterval = cleanupInterval
		}
		cacheIns = newMemoryCache(initInterval)
	})
}

// GetInstance 返回单例，首次调用时自动初始化
func GetInstance() *memoryCache {
	cacheInsOnce.Do(func() {
		cacheIns = newMemoryCache(initInterval)
	})
	return cacheIns
}

func Shutdown() {
	if cacheIns != nil {
		cacheIns.stop()
	}
}

func MemoCacheSet[T any](key string, value T, ttl time.Duration) {
	GetInstance().set(key, value, ttl)
}

func MemoCacheGet[T any](key string) (T, error) {
	var zero T

	raw, err := GetInstance().get(key)
	if err != nil {
		return zero, err
	}

	typed, ok := raw.(T)
	if !ok {
		// 类型不匹配：可能是 key 冲突或调用方用错了类型
		return zero, errors.New("type T not machted with cached value")
	}
	return typed, nil
}

// Delete 删除指定 key
func Delete(key string) {
	GetInstance().delete(key)
}

// Len 返回当前 key 数量（含尚未被清扫的过期 key）
func Len() int {
	return GetInstance().len()
}

func newMemoryCache(cleanupInterval time.Duration) *memoryCache {
	c := &memoryCache{
		items:  make(map[string]entry),
		stopCh: make(chan struct{}),
	}
	if cleanupInterval > 0 {
		go c.cleanupLoop(cleanupInterval)
	}
	return c
}

func (c *memoryCache) set(key string, value interface{}, ttl time.Duration) {
	var expireAt time.Time
	if ttl > 0 {
		expireAt = time.Now().Add(ttl)
	}

	c.mu.Lock()
	c.items[key] = entry{value: value, expireAt: expireAt}
	c.mu.Unlock()
}

func (c *memoryCache) get(key string) (interface{}, error) {
	c.mu.RLock()
	e, ok := c.items[key]
	c.mu.RUnlock()

	if !ok {
		return nil, errors.New("key not found")
	}
	if !e.expireAt.IsZero() && time.Now().After(e.expireAt) {
		c.delete(key)
		return nil, errors.New("cached value is expired")
	}
	return e.value, nil
}

func (c *memoryCache) delete(key string) {
	c.mu.Lock()
	delete(c.items, key)
	c.mu.Unlock()
}

func (c *memoryCache) len() int {
	c.mu.RLock()
	defer c.mu.RUnlock()
	return len(c.items)
}

func (c *memoryCache) stop() {
	c.stopOnce.Do(func() {
		close(c.stopCh)
	})
}

func (c *memoryCache) cleanupLoop(interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			c.cleanup()
		case <-c.stopCh:
			return
		}
	}
}

func (c *memoryCache) cleanup() {
	now := time.Now()
	c.mu.Lock()
	for k, e := range c.items {
		if !e.expireAt.IsZero() && now.After(e.expireAt) {
			delete(c.items, k)
		}
	}
	c.mu.Unlock()
}

func (c *memoryCache) String() string {
	return fmt.Sprintf("memoryCache{size=%d}", c.len())
}