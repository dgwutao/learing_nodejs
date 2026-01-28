import { _ as __nuxt_component_0$1 } from './nuxt-link-NSlaEKu_.mjs';
import { mergeProps, defineComponent, reactive, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc, d as useAuthUser, e as useAuth } from './server.mjs';
import { u as useAdmin } from './useAdmin-BptmwnnJ.mjs';
import { _ as __nuxt_component_1 } from './BaseFooter-BhazZdNI.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BaseHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const currentUser = useAuthUser();
    const isAdmin = useAdmin();
    useAuth();
    const form = reactive({
      pending: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-slate-900" }, _attrs))}><div class="p-3 mx-auto w-full max-w-4xl"><nav class="flex gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex flex-col text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-bold text-lg uppercase leading-none"${_scopeId}>Auth</span><span class="text-sm leading-none text-slate-400"${_scopeId}>example</span>`);
          } else {
            return [
              createVNode("span", { class: "font-bold text-lg uppercase leading-none" }, "Auth"),
              createVNode("span", { class: "text-sm leading-none text-slate-400" }, "example")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ml-auto flex items-center gap-3">`);
      if (unref(currentUser)) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/private",
          class: "px-3 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Private`);
            } else {
              return [
                createTextVNode("Private")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(isAdmin)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin",
            class: "px-3 font-semibold"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Admin`);
              } else {
                return [
                  createTextVNode("Admin")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="py-1.5 px-3 rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 transition-colors"${ssrIncludeBooleanAttr(unref(form).pending) ? " disabled" : ""}> Logout </button><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/guest",
          class: "px-3 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Public`);
            } else {
              return [
                createTextVNode("Public")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "px-3 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></nav></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BaseHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "BaseHeader" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_BaseHeader = __nuxt_component_0;
  const _component_BaseFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_BaseHeader, null, null, _parent));
  _push(`<main class="p-3 mx-auto w-full flex-1 max-w-4xl">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_BaseFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CGbMabqD.mjs.map
