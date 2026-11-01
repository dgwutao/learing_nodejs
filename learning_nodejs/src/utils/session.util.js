import crypto from 'node:crypto';
import redisClient from '../repositories/redisConnector.js';

const SESSION_PREFIX = 'session:';
const USER_SESSIONS_PREFIX = 'user_sessions:';

export const DEFAULT_TTL = 60 * 60 * 24 * 7; //7 days 
export const TOUCH_THRESHOLD_MS = 5 * 60 * 1000;//5 mins

const sessionKey = (token) => `${SESSION_PREFIX}${token}`;
const userSessionsKey = (userId) => `${USER_SESSIONS_PREFIX}${userId}`;

/** 创建会话，返回包含 token 的会话对象 */
export async function createSession(user, { ttl = DEFAULT_TTL, meta = {} } = {}) {
  const token = crypto.randomBytes(32).toString('base64url');
  const now = Date.now();

  const session = {
    token,
    userId: String(user.id),
    username: user.username,
    roles: Array.isArray(user.roles) ? user.roles : [],
    createdAt: now,
    lastActiveAt: now,
    ...meta
  };

  const [setRes, sAddRes, expireRes] = await redisClient
    .multi()
    .set(sessionKey(token), JSON.stringify(session), { EX: ttl })
    .sAdd(userSessionsKey(session.userId), token)
    .expire(userSessionsKey(session.userId), ttl)
    .exec();

  return session;
}

/** 读取会话；不存在或已过期返回 null */
export async function getSession(token) {
  if (!token) return null;

  const raw = await redisClient.get(sessionKey(token));
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    // 数据损坏直接清掉
    await redisClient.del(sessionKey(token));
    return null;
  }
}

export async function touchSession(session, ttl = DEFAULT_TTL) {
  const now = Date.now();
  if (now - (session.lastActiveAt ?? 0) < TOUCH_THRESHOLD_MS) return false;

  session.lastActiveAt = now;

  await redisClient
    .multi()
    .set(sessionKey(session.token), JSON.stringify(session), { EX: ttl })
    .expire(userSessionsKey(session.userId), ttl)
    .exec();

  return true;
}

/** 保存/续期会话（滑动过期） */
export async function saveSession(session, ttl = DEFAULT_TTL) {
  if (!session?.token) return null;

  session.lastActiveAt = Date.now();

  await redisClient
    .multi()
    .set(sessionKey(session.token), JSON.stringify(session), { EX: ttl })
    .expire(userSessionsKey(session.userId), ttl)
    .exec();

  return session;
}

/** 销毁单个会话（登出） */
export async function destroySession(token, userId = '') {
  if (!token) return false;

  const key = sessionKey(token);
  const raw = await redisClient.get(key);
  await redisClient.del(key);

  if (raw) {
    try {
      if (userId.length == 0) {
        const session = JSON.parse(raw);
        userId = session.userId;
      }
      await redisClient.sRem(userSessionsKey(userId), token);
    } catch {
      /* ignore */
    }
  }

  return Boolean(raw);
}

export async function destroyAllUserSessions(userId) {
  const usersKey = userSessionsKey(String(userId));
  const tokens = await redisClient.sMembers(usersKey);

  if (!tokens.length) return 0;

  const sessionsKey = tokens.map(sessionKey);
  await redisClient.del([...sessionsKey, usersKey]);

  return tokens.length;
}