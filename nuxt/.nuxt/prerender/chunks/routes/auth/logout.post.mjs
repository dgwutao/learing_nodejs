import { defineEventHandler, deleteCookie } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: false
  });
  return {
    user: null
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
