import { g as defineNuxtRouteMiddleware, d as useAuthUser, n as navigateTo } from "../server.mjs";
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
const guestOnly = defineNuxtRouteMiddleware(async () => {
  const user = useAuthUser();
  if (user.value) {
    return navigateTo({ name: "index" });
  }
});
export {
  guestOnly as default
};
//# sourceMappingURL=guest-only-CFv9KI1Y.js.map
