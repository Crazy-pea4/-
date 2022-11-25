// 引入路由组件
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";
export default [
  {
    // 重定向，将初始地址指向/home
    path: "/",
    redirect: "/home",
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      showFooter: false,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      showFooter: false,
    },
  },
  {
    name: "search",
    // 在占位符末尾写上 ? 代表该params参数可传可不传
    path: "/search/:keyword?",
    component: Search,
    meta: {
      showFooter: true,
    },
  },
  {
    name: "detail",
    path: "/detail/:goodsId",
    component: Detail,
    meta: {
      showFooter: true,
    },
  },
  {
    // 路由的路径是小写的
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    // 这里不使用路由间直接传参，而是通过将数据储存到会话储存当中，这样当用户刷新时就不会报错
    // props($route) {
    //     return {
    //         skuName: $route.query.skuInfo.skuName,
    //         skuIamgeUrl: $route.query.skuInfo.skuImageList[0].imgUrl,
    //         skuDesc: $route.query.skuInfo.skuDesc,
    //     }
    // },
    meta: {
      showFooter: true,
    },
  },
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: {
      showFooter: true,
    },
  },
];
