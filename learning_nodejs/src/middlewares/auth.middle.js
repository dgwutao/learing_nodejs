import { getSession, saveSession, DEFAULT_TTL } from '../utils/session.util.js';

const TOUCH_THRESHOLD_MS = 60 * 1000;

export function extractToken(req) {
  const header = req.headers.authorization;
  if (header && /^Bearer\s+/i.test(header)) {
    return header.replace(/^Bearer\s+/i, '').trim();
  }

  const custom = req.headers['x-session-token'];
  if (typeof custom === 'string' && custom.trim()) {
    return custom.trim();
  }

  return null;
}


export async function loadSession(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token) return next();

    const session = await getSession(token);
    if (!session) return next();

    const now = Date.now();
    if (now - session.lastActiveAt > TOUCH_THRESHOLD_MS) {
      await saveSession(session, DEFAULT_TTL);
    }

    req.$token = token;
    req.$sessionData = session;
    req.$user = {
      id: session.userId,
      username: session.username,
      roles: session.roles ?? []
    };

    next();
  } catch (err) {
    next(err);
  }
}


export function requireAuth(req, res, next) {
  if (!req.$sessionData) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}