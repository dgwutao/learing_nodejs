import { d as useAuthUser } from './server.mjs';
import { computed } from 'file:///Users/alex/SVN/learing_nodejs/nuxt/node_modules/vue/index.mjs';

const useAdmin = () => {
  const authUser = useAuthUser();
  return computed(() => {
    if (!authUser.value) return false;
    return authUser.value.roles.includes("ADMIN");
  });
};

export { useAdmin as u };
//# sourceMappingURL=useAdmin-BptmwnnJ.mjs.map
