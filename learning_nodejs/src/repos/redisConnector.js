import { createClient } from 'redis';
import { logger } from '../utils/logger.util.js';

const redisClient = createClient({
  socket: {
    host:'localhost',
    port:'6379',
    connectTimeout:10000,
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
    noDelay: true
  },
  password:'Wutao123$'
});

redisClient.on('error', (error) => logger.error(error, `[Redis] error:`));
redisClient.on('connect', () => logger.info('[Redis] connecting...'));
redisClient.on('ready', () => logger.info('[Redis] ready'));
redisClient.on('end', () => logger.info('[Redis] connection closed'));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}

export default redisClient;