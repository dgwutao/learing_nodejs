import { g as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useAdmin } from "./useAdmin-BptmwnnJ.js";
import "vue";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/hookable/dist/index.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/unctx/dist/index.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/radix3/dist/index.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/defu/dist/defu.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/ufo/dist/index.mjs";
import "vue/server-renderer";
const adminOnly = defineNuxtRouteMiddleware(async () => {
  const isAdmin = useAdmin();
  if (!isAdmin.value) return navigateTo({ name: "login" });
});
export {
  adminOnly as default
};
//# sourceMappingURL=admin-only-VOBevZn-.js.map
