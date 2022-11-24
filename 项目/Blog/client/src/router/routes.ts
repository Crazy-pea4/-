export default [
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
      isKeepAlive: true,
      isShowSideBar: true,
    },
  },
  {
    name: "Write",
    path: "/write",
    component: () => import("@/views/Write/index.vue"),
  },
  {
    name: "Question",
    path: "/question",
    component: () => import("@/views/Question/index.vue"),
  },
];
