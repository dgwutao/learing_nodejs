import { d as defineEventHandler, r as readBody, c as createError, a as findUserByEmail, s as serialize, b as sign, u as useRuntimeConfig, e as setCookie } from '../../nitro/nitro.mjs';
import { verify } from '@node-rs/argon2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

async function verifyPassword(hash2, plainPassword) {
  return await verify(hash2, plainPassword);
}

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, rememberMe } = body;
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email address and password are required"
    });
  }
  const userWithPassword = await findUserByEmail(email);
  if (!userWithPassword) {
    throw createError({
      statusCode: 401,
      message: "Bad credentials"
    });
  }
  const verified = await verifyPassword(userWithPassword.password, password);
  if (!verified) {
    throw createError({
      statusCode: 401,
      message: "Bad credentials"
    });
  }
  const config = useRuntimeConfig();
  const session = serialize({ userId: userWithPassword.id });
  const signedSession = sign(session, config.cookieSecret);
  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true,
    expires: rememberMe ? new Date(Date.now() + parseInt(config.cookieRememberMeExpires)) : new Date(Date.now() + parseInt(config.cookieExpires))
  });
  const { password: _password, ...userWithoutPassword } = userWithPassword;
  return {
    user: userWithoutPassword
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
