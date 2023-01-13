import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Page1 from "../views/Home/Page1";
import Page2 from "../views/Home/Page2";
import Center from "../views/Center";
import User from "../views/User";
import NotFound from "../views/NotFound";
import Login from "../views/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        <Route index element={<Page1 />}></Route>
        <Route path="page1" element={<Page1 />}></Route>
        <Route path="page2/:id?" element={<Page2 />}></Route>
      </Route>
      <Route path="/center" element={<Center />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      {/* 
        当跳转/user路径时，需要鉴权。
        注意：这里的element只接受一个组件，如果使用isAuth ? <User /> : <Navigate to="/login" />的写法
            会在第一次完成三目运算后把组件定死。后续再次匹配到也只是重新渲染定死的组件
        因此我们可以把它封装成一个组件，在组件内部完成isAuth校验
       */}
      <Route
        path="/user"
        element={
          // 每次重新匹配路径都会渲染一次组件
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
