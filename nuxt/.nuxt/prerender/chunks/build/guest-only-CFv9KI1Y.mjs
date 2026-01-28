import { g as defineNuxtRouteMiddleware, d as useAuthUser, n as navigateTo } from './server.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/vue/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/ufo/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/destr/dist/index.mjs';
import '../nitro/nitro.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/hookable/dist/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/node-mock-http/dist/index.mjs';
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
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/vue/server-renderer/index.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unhead/dist/server.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/devalue/index.js';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/unhead/dist/utils.mjs';
import 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/vue-router/vue-router.node.mjs';

const guestOnly = defineNuxtRouteMiddleware(async () => {
  const user = useAuthUser();
  if (user.value) {
    return navigateTo({ name: "index" });
  }
});

export { guestOnly as default };
//# sourceMappingURL=guest-only-CFv9KI1Y.mjs.map
