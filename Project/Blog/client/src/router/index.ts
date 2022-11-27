import { createRouter, createWebHistory } from "vue-router";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import { isValid } from "@/api/auth";

// 引入路由
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// 前置路由守卫
router.beforeEach(async (to, form) => {
  if (sessionStorage.getItem("isValid") === "true") return;
  const token = localStorage.getItem("token");
  if (!token && to.name !== "Login" && to.name !== "Register") {
    sessionStorage.setItem("isValid", "false");
    await message.error("登录校验失效，请重新登录", 0.8);
    return { name: "Login" };
  } else if (token) {
    try {
      const { data } = await isValid();
      if (data.code === 201) {
        sessionStorage.setItem("isValid", "true");
      } else {
        throw new Error("inValid");
      }
    } catch (err) {
      console.log(err);
      if (to.name !== "Login" && to.name !== "Register") {
        sessionStorage.setItem("isValid", "false");
        await message.error("身份校验失效，请重新登录", 0.8);
        return { name: "Login" };
      }
    }
  }
});

export default router;
