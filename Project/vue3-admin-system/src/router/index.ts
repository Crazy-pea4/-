import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
// 这里遇到了一个问题 N5
import { shallowRef } from "vue";
import { TrendCharts, List, Management } from "@element-plus/icons-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    // 路由懒加载：写成函数形式代表用到时才加载
    component: () => import("../views/Login/UserPage.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home/HomePage.vue"),
    children: [
      {
        path: "echarts",
        name: "echarts",
        component: () => import("../views/Home/Children/EchartsView.vue"),
        meta: {
          title: "图表数据",
          icon: shallowRef(TrendCharts),
          keepAlive: true,
        },
      },
      {
        path: "PayList",
        name: "PayList",
        component: () => import("../views/Home/Children/PayList.vue"),
        meta: {
          title: "缴费管理",
          icon: shallowRef(Management),
        },
      },
      {
        path: "UserInfo",
        name: "UserInfo",
        component: () => import("../views/Home/Children/UserInfo.vue"),
        meta: {
          title: "用户信息",
          icon: shallowRef(List),
        },
        children: [
          {
            path: "UserList",
            name: "UserList",
            component: () => import("../views/Home/Children/UserList.vue"),
            meta: {
              title: "用户列表",
            },
          },
          {
            path: "UserUpdate",
            name: "UserUpdate",
            component: () => import("../views/Home/Children/UserUpdate.vue"),
            meta: {
              title: "用户数据更新",
            },
          },
        ],
      },
    ],
  },
];
// 改成hash模式是为了在vue.config.js中配置publicPath，history模式需要和服务器打配合才能上线使用
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
