import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const ToPage = (routeName, id) => {
    if (routeName === "Page1") {
      // query传参
      navigate(`${routeName}?id=${id}`);
    } else {
      // params传参（路由传参）与vue-router类似，需要在路由处配置/:params1[?]
      navigate(`${routeName}/${id}`);
    }
  };
  return (
    <div>
      Home
      {/* Outlet 类似与router-view，是子路由出口 */}
      <Outlet></Outlet>
      <button onClick={() => ToPage("Page1", 711)}>ToPage1</button>
      <button onClick={() => ToPage("Page2", 1019)}>ToPage2</button>
    </div>
  );
}
