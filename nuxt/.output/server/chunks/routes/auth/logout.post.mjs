import { d as defineEventHandler, g as deleteCookie, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const logout_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  deleteCookie(event, config.cookieName, {
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: true
  });
  return {
    user: null
  };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
