import React from "react";
import { NavLink } from "dva/router";
// dva对css做了类似moduleCss的处理
import style from "./index.css";

export default function TabBar() {
  return (
    <ul>
      <li>
        <NavLink to="/home" activeClassName={style.active}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/center" activeClassName={style.active}>
          Center
        </NavLink>
      </li>
      <li>
        <NavLink to="/location" activeClassName={style.active}>
          Location
        </NavLink>
      </li>
    </ul>
  );
}
