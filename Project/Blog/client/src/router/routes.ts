import type { RouteRecordRaw } from "vue-router";

export default <RouteRecordRaw[]>[
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
      isShowCopyRight: true,
    },
  },
  {
    name: "User",
    path: "/user",
    component: () => import("@/views/User/index.vue"),
    // 打开user既重定向到 /user/CollectedQuestion
    redirect: "/user/CollectedQuestion",
    meta: {
      isKeepAlive: true,
      isShowCopyRight: true,
      isShowSideBar: true,
    },
    children: [
      {
        name: "CollectedQuestion",
        path: "collectedQuestion",
        component: () =>
          import("@/views/user/userCollections/Question/index.vue"),
        meta: {
          index: 0,
        },
      },
      {
        name: "LikedAnswer",
        path: "LikedAnswer",
        component: () =>
          import("@/views/user/userCollections/Answer/index.vue"),
        meta: {
          index: 1,
        },
      },
    ],
  },
  {
    name: "Write",
    path: "/write/:questionId",
    component: () => import("@/views/Write/index.vue"),
  },
  {
    name: "Question",
    path: "/question",
    component: () => import("@/views/Question/index.vue"),
    meta: {
      isShowSearchBar: true,
      isShowSideBar: true,
      isShowCopyRight: true,
    },
  },
  {
    name: "Search",
    path: "/search",
    component: () => import("@/views/Search/index.vue"),
    meta: {
      isShowSearchBar: true,
      isShowSideBar: true,
      isShowCopyRight: true,
    },
  },
];
