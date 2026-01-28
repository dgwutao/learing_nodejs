import { defineEventHandler } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/h3/dist/index.mjs';

const me_get = defineEventHandler(async (event) => {
  const userWithPassword = event.context.user;
  if (!userWithPassword) {
    return {
      user: null
    };
  }
  const { password: _password, ...userWithoutPassword } = userWithPassword;
  return {
    user: userWithoutPassword
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
