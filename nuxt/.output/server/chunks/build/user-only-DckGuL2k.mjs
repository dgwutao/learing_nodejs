import { g as defineNuxtRouteMiddleware, d as useAuthUser, n as navigateTo } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const userOnly = defineNuxtRouteMiddleware(async () => {
  const user = useAuthUser();
  if (!user.value) return navigateTo({ name: "login" });
});

export { userOnly as default };
//# sourceMappingURL=user-only-DckGuL2k.mjs.map
