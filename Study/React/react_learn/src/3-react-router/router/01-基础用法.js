import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Center from "../views/Center";
import User from "../views/User";
import NotFound from "../views/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Route必须包含再Routes里 */}
      <Route path="/home" element={<Home />}></Route>
      <Route path="/center" element={<Center />}></Route>
      <Route path="/user" element={<User />}></Route>

      {/* 
        重定向：使用Navigate组件
        或者使用useNavigate()钩子自定义一个Redirect组件
      */}
      <Route path="/" element={<Navigate to="/home" />}></Route>
      {/* 404NotFound定向也类似 */}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
