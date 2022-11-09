import { createRouter, createWebHistory } from "vue-router";
import { message } from "ant-design-vue";
import { isValid } from "@/api/auth";

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

// 路由守卫
router.beforeEach(async (to, form) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Login") {
    await message.error("登录校验失效，请重新登录", 0.8);
    return { name: "Login" };
  } else if (token) {
    try {
      const res = await isValid(token);
      console.log(res);
    } catch (err) {
      console.log(err);
      if (to.name !== "Login" && to.name !== "Register") {
        await message.error("身份校验失效，请重新登录", 0.8);
        return { name: "Login" };
      }
    }
  }
});

export default router;
