import { g as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAdmin } from './useAdmin-BptmwnnJ.mjs';
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

const adminOnly = defineNuxtRouteMiddleware(async () => {
  const isAdmin = useAdmin();
  if (!isAdmin.value) return navigateTo({ name: "login" });
});

export { adminOnly as default };
//# sourceMappingURL=admin-only-VOBevZn-.mjs.map
