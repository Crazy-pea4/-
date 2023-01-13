import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../views/Home";
import Page1 from "../views/Home/Page1";
import Page2 from "../views/Home/Page2";
import Center from "../views/Center";
import User from "../views/User";
import NotFound from "../views/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        {/* 如果想要显示/home路径下的默认子路由，可以使用index属性，当路径没有匹配到时，就会显示有index属性的路由 */}
        <Route index element={<Page1 />}></Route>
        <Route path="page1" element={<Page1 />}></Route>
        <Route path="page2" element={<Page2 />}></Route>
      </Route>
      <Route path="/center" element={<Center />}></Route>
      <Route path="/user" element={<User />}></Route>

      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
