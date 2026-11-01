import Layout from "@/layout/index";
import { createRouter, createWebHistory } from "vue-router";
// 公共路由
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () => import("@/views/index"),
      },
      {
        path: "/about",
        component: () => import("@/views/about"),
      },
      {
        path: "/project",
        component: () => import("@/views/project"),
      },
      {
        path: "/country",
        component: () => import("@/views/country"),
      },         
      {
        path: "/service",
        component: () => import("@/views/service"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    //   console.log(to)
    //   console.log(from)
    //   console.log(savedPosition)
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
