import { _ as __nuxt_component_0, a as __nuxt_component_1, b as __nuxt_component_2 } from "./PageUser-CceemCpv.js";
import { defineComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/hookable/dist/index.mjs";
import { d as useAuthUser } from "../server.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/unctx/dist/index.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/radix3/dist/index.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/defu/dist/defu.mjs";
import "/Users/alex/SVN/learing_nodejs/nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "guest",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUser = useAuthUser();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageTitle = __nuxt_component_0;
      const _component_PageDescription = __nuxt_component_1;
      const _component_PageUser = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_PageTitle, { title: "Guest page" }, null, _parent));
      _push(ssrRenderComponent(_component_PageDescription, { description: "This page should only be accessible to guests." }, null, _parent));
      _push(ssrRenderComponent(_component_PageUser, { user: unref(currentUser) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/guest.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=guest-Dnc0Lyro.js.map
