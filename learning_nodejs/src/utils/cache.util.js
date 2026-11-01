import redisClient from "../repos/redisConnector.js";
import { logger } from "./logger.util.js";
import crypto from 'node:crypto';

const DEFAULT_TTLTTL = 60 * 60; //1 hour
const CACHE_PREFIX = 'cache:';

  /**
   * 默认随机键生成器
   * @param {*}
   * @returns {string} 缓存键
   */
export function randomKeyGenerator (){
    const key = crypto.randomBytes(32).toString('base64url');
    return `${CACHE_PREFIX}${key}`;
}
  /**
   * 基于URL、查询参数和请求头生成唯一键
   * @param {Object} req Express请求对象
   * @returns {string} 缓存键
   */
export const keyGeneratorByReq = (req) => {
    const keyParts = [
      req.method,
      req.originalUrl || req.url,
      JSON.stringify(req.query),
      // 可以添加用户ID等作为缓存区分（如需要用户隔离）
      // req.user?.id || 'anonymous'
    ];
    return `${CACHE_PREFIX}${Buffer.from(keyParts.join('|')).toString('base64')}`;
}

  /**
   * 检查请求头（客户端可以要求不缓存）
   * @param {Object} req Express请求对象
   * @returns {boolean} 缓存键
   */
export const shouldCacheByReq = (req) => {
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
export async function set(key, value, ttl = DEFAULT_TTLTTL) {
    try {
        await redisClient.set(key, JSON.stringify(value), { EX: ttl })
    } catch (error) {
        logger.error(error, `Failed to set cache:`)
    }
}

  /**
   * 获取缓存
   * @param {string} key 缓存键
   * @returns {*} 缓存值或null
   */
export async function get(key) {
    let raw;
    try {
        raw = await redisClient.get(key);
        if (!raw) return null;
    } catch (error) {
        logger.error(error, `Failed to get cache:`)
        return null
    }
    try {
        return JSON.parse(raw);
    } catch (error) {
        await redisClient.del(key);
        logger.error(error, `Failed to parse cache:`)
        return null;
    }
}

  /**
   * 删除缓存
   * @param {string} key 缓存键
   */
export async function remove(key) {
    try {
        await redisClient.del(key);
    } catch (error) {
        logger.error(error, `Failed to remove cache:`)
    }
}
    