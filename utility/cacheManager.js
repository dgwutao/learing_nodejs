class SimpleCache {
  static instance = null

  constructor() {
    if (SimpleCache.instance) {
      return SimpleCache.instance
    }

    this.cache = new Map();
    // this.cache = new WeakMap();
    this.defaultTTL = 60 * 60 * 1000; // 默认1小时

    SimpleCache.instance = this
  }

  set(key, value, ttl = this.defaultTTL) {
    const expire = Date.now() + ttl;
    this.cache.set(key, { value, expire });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // 检查是否过期
    if (Date.now() > item.expire) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // 清理过期项目
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expire) {
        this.cache.delete(key);
      }
    }
  }

  // 监控内存使用
  startMemoryMonitoring() {
    if (this.monitorInterval) return
    this.monitorInterval = setInterval(() => {
      const used = process.memoryUsage();
      console.log({
        rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(used.external / 1024 / 1024)} MB`
      });
      
      if (used.heapUsed > 500 * 1024 * 1024) { 
        // 500MB
        // this.triggerGarbageCollection();
      }
    }, 30000);
  }
}

module.exports = SimpleCache