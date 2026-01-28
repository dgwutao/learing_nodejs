import { _ as __nuxt_component_0 } from './nuxt-link-NSlaEKu_.mjs';
import { _ as __nuxt_component_1 } from './BaseFooter-BhazZdNI.mjs';
import { defineComponent, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent } from 'vue/server-renderer';
import { e as useAuth } from './server.mjs';
import { u as useAdmin } from './useAdmin-BptmwnnJ.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const form = reactive({
      data: {
        email: "admin@gmail.com",
        password: "password",
        rememberMe: false
      },
      error: "",
      pending: false
    });
    useAdmin();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_BaseFooter = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}><header><h1 class="my-24 font-bold text-2xl text-center">Login to your account</h1></header><main class="mx-auto max-w-sm w-full"><form class="mb-6 p-12 bg-slate-900 rounded shadow">`);
      if (unref(form).error) {
        _push(`<p class="mb-3 px-3 py-1.5 w-full border rounded border-red-400 text-sm text-center text-red-400">${ssrInterpolate(unref(form).error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-3"><label for="email" class="mb-1 inline-block font-semibold text-sm text-slate-200">Email address</label><input id="email"${ssrRenderAttr("value", unref(form).data.email)} type="email" class="px-3 py-1.5 w-full border rounded border-slate-700 bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent" required></div><div class="mb-3"><label for="password" class="mb-1 inline-block font-semibold text-sm text-slate-200">Password</label><input id="password"${ssrRenderAttr("value", unref(form).data.password)} type="password" class="px-3 py-1.5 w-full border rounded border-slate-700 bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent" required></div><div class="mb-3 flex justify-end items-center"><label for="remember-me" class="mr-1 text-sm text-light-100">Remember me</label><input id="remember-me"${ssrIncludeBooleanAttr(Array.isArray(unref(form).data.rememberMe) ? ssrLooseContain(unref(form).data.rememberMe, null) : unref(form).data.rememberMe) ? " checked" : ""} type="checkbox" class="w-4 h-4 accent-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"></div><div><button type="submit"${ssrIncludeBooleanAttr(unref(form).pending) ? " disabled" : ""} class="px-3 py-1.5 w-full rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 focus:outline-none focus:bg-light-700 transition-colors"> Sign in </button></div></form><div class="mb-6 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xs text-slate-400 transition-colors hover:text-light-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go back home`);
          } else {
            return [
              createTextVNode("Go back home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div><h3 class="mb-1 font-bold">Help</h3><p class="text-sm text-slate-400"> For demo purpose, this application comes with predefined credentials you can use to login: </p><ul class="text-sm text-slate-400"><li><code class="text-slate-200">admin@gmail.com</code> with <code class="text-slate-200">password</code></li><li><code class="text-slate-200">user@gmail.com</code> with <code class="text-slate-200">password</code></li></ul></div></main>`);
      _push(ssrRenderComponent(_component_BaseFooter, { class: "mt-auto" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CEFWe8uh.mjs.map
