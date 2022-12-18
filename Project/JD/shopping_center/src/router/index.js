// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由信息
import routes from "./routes.js";
// 重写push|replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 第一个参数：照常接收使用。用于告诉原来的push方法往哪里跳，带哪些参数...
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 使用插件
Vue.use(VueRouter);
// 配置路由
let router = new VueRouter({
  routes,
  // 配置滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router;
