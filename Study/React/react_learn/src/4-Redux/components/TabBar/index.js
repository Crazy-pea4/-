import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

export default function TabBar() {
  return (
    <div>
      <footer className="tabbar">
        <span>
          {/* NavLink会自动添加一个active类名给匹配的导航 */}
          <NavLink
            to="/home"
            className={
              ({ isActive }) => (isActive ? "yarh-active" : "")
              // NavLink的className若是一个函数，则会接收一个对象里面有isActive和isPending
            }
          >
            首页
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/center"
            className={({ isActive }) => (isActive ? "yarh-active" : "")}
          >
            中心
          </NavLink>
        </span>
      </footer>
    </div>
  );
}
