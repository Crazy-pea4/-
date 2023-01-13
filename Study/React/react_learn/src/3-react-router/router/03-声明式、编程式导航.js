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
        <Route index element={<Page1 />}></Route>
        <Route path="page1" element={<Page1 />}></Route>
        {/* 与Vue-router类似，需要/:parmas1占位，末尾添加?表示可选 */}
        <Route path="page2/:id?" element={<Page2 />}></Route>
      </Route>
      <Route path="/center" element={<Center />}></Route>
      <Route path="/user" element={<User />}></Route>

      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
