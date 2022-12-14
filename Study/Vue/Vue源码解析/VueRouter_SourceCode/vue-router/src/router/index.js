import Vue from "vue";
// import VueRouter from "vue-router";
import VueRouter from "../../../index";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>Home aPath</h1>,
        },
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>Home bPath</h1>,
        },
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    children: [
      {
        path: "a",
        component: {
          render: (h) => <h1>About aPath</h1>,
        },
      },
      {
        path: "b",
        component: {
          render: (h) => <h1>About bPath</h1>,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((from, to, next) => {
  setTimeout(() => {
    console.log("放行咯");
    next();
  }, 1000);
});

export default router;
