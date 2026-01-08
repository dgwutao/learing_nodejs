/**
 * Node.js 缓存中间件
 * 支持内存缓存，可扩展为Redis等分布式缓存
 */
class CacheMiddleware {
  /**
   * 构造函数
   * @param {Object} options 配置选项
   * @param {number} options.defaultTTL 默认缓存时间（秒），默认3600秒（1小时）
   * @param {boolean} options.debug 调试模式，默认false
   * @param {Function} options.keyGenerator 自定义缓存键生成函数
   * @param {string[]} options.excludePaths 排除缓存的路径
   * @param {string[]} options.includeMethods 需要缓存的方法，默认['GET']
   */
  constructor(options = {}) {
    this.options = {
      defaultTTL: options.defaultTTL || 3600,
      debug: options.debug || false,
      keyGenerator: options.keyGenerator || this.defaultKeyGenerator,
      excludePaths: options.excludePaths || [],
      includeMethods: options.includeMethods || ['GET'],
      ...options
    };
    
    // 缓存存储（内存）
    this.cache = new Map();
    
    // 定时清理过期缓存（每5分钟一次）
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpired();
    }, 5 * 60 * 1000);
    
    // 确保进程退出时清理定时器
    process.on('SIGINT', () => this.destroy());
    process.on('SIGTERM', () => this.destroy());
    
    this._log('缓存中间件初始化完成');
  }

  /**
   * 默认缓存键生成器
   * @param {Object} req Express请求对象
   * @returns {string} 缓存键
   */
  defaultKeyGenerator(req) {
    // 基于URL、查询参数和请求头生成唯一键
    const keyParts = [
      req.method,
      req.originalUrl || req.url,
      JSON.stringify(req.query),
      // 可以添加用户ID等作为缓存区分（如需要用户隔离）
      // req.user?.id || 'anonymous'
    ];
    return `cache:${Buffer.from(keyParts.join('|')).toString('base64')}`;
  }

  /**
   * 主中间件函数
   */
  middleware() {
    return (req, res, next) => {
      // 检查是否应该缓存此请求
      if (!this.shouldCache(req)) {
        return next();
      }

      // 生成缓存键
      const cacheKey = this.options.keyGenerator(req);
      
      // 尝试获取缓存
      const cached = this.get(cacheKey);
      
      if (cached) {
        this._log(`缓存命中: ${cacheKey}`);
        
        // 设置响应头，指示来自缓存
        res.set('X-Cache', 'HIT');
        res.set('X-Cache-Key', cacheKey);
        res.set('X-Cache-Expires', new Date(cached.expiresAt).toUTCString());
        
        // 根据缓存的数据类型发送响应
        if (cached.headers) {
          Object.entries(cached.headers).forEach(([key, value]) => {
            res.set(key, value);
          });
        }
        
        return res.status(cached.status || 200).send(cached.body);
      }

      this._log(`缓存未命中: ${cacheKey}`);
      
      // 重写res.send方法以捕获响应
      const originalSend = res.send.bind(res);
      const originalJson = res.json.bind(res);
      
      // 标记响应头
      res.set('X-Cache', 'MISS');
      
      // 重写send方法
      res.send = (body) => {
        // 只缓存成功的响应（2xx状态码）
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.set(cacheKey, {
            body,
            status: res.statusCode,
            headers: res.getHeaders(),
            timestamp: Date.now()
          }, this.options.defaultTTL);
        }
        
        // 调用原始send方法
        return originalSend(body);
      };
      
      // 重写json方法
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.set(cacheKey, {
            body,
            status: res.statusCode,
            headers: res.getHeaders(),
            timestamp: Date.now()
          }, this.options.defaultTTL);
        }
        
        return originalJson(body);
      };
      
      next();
    };
  }

  /**
   * 判断请求是否应该被缓存
   * @param {Object} req Express请求对象
   * @returns {boolean}
   */
  shouldCache(req) {
    // 检查请求方法
    if (!this.options.includeMethods.includes(req.method.toUpperCase())) {
      return false;
    }
    
    // 检查排除路径
    const path = req.path || req.url.split('?')[0];
    if (this.options.excludePaths.some(excluded => path.startsWith(excluded))) {
      return false;
    }
    
    // 可以通过查询参数控制缓存（如 ?noCache=true）
    if (req.query.noCache === 'true' || req.query.cache === 'false') {
      return false;
    }
    
    // 检查请求头（客户端可以要求不缓存）
    const cacheControl = req.get('Cache-Control');
    if (cacheControl && cacheControl.includes('no-cache')) {
      return false;
    }
    
    return true;
  }

  /**
   * 设置缓存
   * @param {string} key 缓存键
   * @param {*} value 缓存值
   * @param {number} ttl 缓存时间（秒）
   */
  set(key, value, ttl = this.options.defaultTTL) {
    const expiresAt = Date.now() + (ttl * 1000);
    
    this.cache.set(key, {
      ...value,
      expiresAt,
      ttl
    });
    
    this._log(`缓存已设置: ${key}, TTL: ${ttl}秒`);
  }

  /**
   * 获取缓存
   * @param {string} key 缓存键
   * @returns {*} 缓存值或null
   */
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // 检查是否过期
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item;
  }

  /**
   * 删除缓存
   * @param {string} key 缓存键
   */
  delete(key) {
    this.cache.delete(key);
    this._log(`缓存已删除: ${key}`);
  }

  /**
   * 清空所有缓存
   */
  clear() {
    this.cache.clear();
    this._log('所有缓存已清空');
  }

  /**
   * 清理过期缓存
   */
  cleanupExpired() {
    const now = Date.now();
    let deletedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    if (deletedCount > 0) {
      this._log(`清理了 ${deletedCount} 个过期缓存项`);
    }
  }

  /**
   * 获取缓存统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    const now = Date.now();
    const validItems = Array.from(this.cache.values())
      .filter(item => now <= item.expiresAt);
    
    const expiredItems = Array.from(this.cache.values())
      .filter(item => now > item.expiresAt);
    
    return {
      total: this.cache.size,
      valid: validItems.length,
      expired: expiredItems.length,
      memoryUsage: process.memoryUsage().heapUsed
    };
  }

  /**
   * 销毁中间件，清理资源
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
    this._log('缓存中间件已销毁');
  }

  /**
   * 日志输出
   * @param {string} message 日志消息
   */
  _log(message) {
    if (this.options.debug) {
      console.log(`[CacheMiddleware] ${new Date().toISOString()} ${message}`);
    }
  }
}

/**
 * Redis缓存适配器（扩展示例）
 * 如果你需要分布式缓存，可以这样扩展
 */
class RedisCacheAdapter {
  constructor(redisClient, options = {}) {
    this.redis = redisClient;
    this.options = options;
  }

  async set(key, value, ttl) {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async get(key) {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async delete(key) {
    await this.redis.del(key);
  }
}
export default CacheMiddleware
// module.exports = CacheMiddleware;