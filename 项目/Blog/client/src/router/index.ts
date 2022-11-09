import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      name: "Login",
      path: "/login",
      component: () => import("@/views/Login/index.vue"),
      meta: {},
    },
    {
      name: "Register",
      path: "/register",
      component: () => import("@/views/Register/index.vue"),
      meta: {},
    },
    {
      name: "Home",
      path: "/home",
      component: () => import("@/views/Home/index.vue"),
      meta: {
        isShowSearchBar: true,
        isKeepAlive: true,
        isShowSideBar: true,
      },
    },
    {
      name: "Setting",
      path: "/setting",
      component: () => import("@/views/Setting/index.vue"),
      meta: {
        isShowSearchBar: true,
        isKeepAlive: true,
        isShowSideBar: true,
      },
    },
  ],
});

export default router;
