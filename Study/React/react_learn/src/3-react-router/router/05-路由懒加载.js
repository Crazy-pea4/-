import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import Home from "../views/Home";
import Page1 from "../views/Home/Page1";
import Page2 from "../views/Home/Page2";
import Center from "../views/Center";
import User from "../views/User";
import NotFound from "../views/NotFound";
import Login from "../views/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />}> */}
      {/* 给Home页面LazyLoad处理 */}
      <Route path="/home" element={LazyLoad("/Home")}>
        <Route index element={<Page1 />}></Route>
        <Route path="page1" element={<Page1 />}></Route>
        <Route path="page2/:id?" element={<Page2 />}></Route>
      </Route>
      <Route path="/center" element={<Center />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route
        path="/user"
        element={
          <AuthComponent>
            <User></User>
          </AuthComponent>
        }
      ></Route>

      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

function AuthComponent({ children }) {
  const isAuth = sessionStorage.getItem("isAuth");
  return isAuth ? children : <Navigate to="/login" />;
}

/**
 * 路由懒加载组件封装
 */
function LazyLoad(path) {
  // React.lazy接收一个回调，回调的返回值是import(path)。本身返回一个函数
  const Com = React.lazy(() => import(`../views${path}`));
  return (
    // 将React.lazy返回的函数写成组件包裹在React.Suspense中
    <React.Suspense fallback={<p>加载中...</p>}>
      <Com></Com>
    </React.Suspense>
  );
}
