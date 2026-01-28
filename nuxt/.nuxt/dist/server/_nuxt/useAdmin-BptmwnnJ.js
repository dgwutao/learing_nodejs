import { d as useAuthUser } from "../server.mjs";
import { computed } from "vue";
const useAdmin = () => {
  const authUser = useAuthUser();
  return computed(() => {
    if (!authUser.value) return false;
    return authUser.value.roles.includes("ADMIN");
  });
};
export {
  useAdmin as u
};
//# sourceMappingURL=useAdmin-BptmwnnJ.js.map
