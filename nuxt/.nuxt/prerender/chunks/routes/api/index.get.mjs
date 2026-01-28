import { defineEventHandler, createError } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs';
import { i as isAdmin, f as findAllUsers } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  if (!isAdmin(event.context.user)) {
    throw createError({
      statusCode: 401,
      message: "You don't have the rights to access this resource"
    });
  }
  const usersWithPassword = await findAllUsers();
  const usersWithoutPassword = usersWithPassword.map(({ password, ...user }) => user);
  return usersWithoutPassword;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
