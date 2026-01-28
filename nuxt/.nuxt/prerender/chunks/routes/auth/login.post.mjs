import { defineEventHandler, readBody, createError, setCookie } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs';
import { a as findUserByEmail, u as useRuntimeConfig, s as serialize, b as sign } from '../../nitro/nitro.mjs';
import { verify } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/@node-rs/argon2/index.js';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/destr/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/node-mock-http/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/ufo/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unstorage/drivers/fs.mjs';
import 'node:crypto';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unstorage/drivers/lru-cache.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/ohash/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/klona/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/defu/dist/defu.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/scule/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unctx/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/pathe/dist/index.mjs';

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
    secure: false,
    expires: rememberMe ? new Date(Date.now() + parseInt(config.cookieRememberMeExpires)) : new Date(Date.now() + parseInt(config.cookieExpires))
  });
  const { password: _password, ...userWithoutPassword } = userWithPassword;
  return {
    user: userWithoutPassword
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
