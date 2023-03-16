export default function () {
  return `import React from "react";
import { useNavigate } from "react-router-dom";
import Style from "@/css/Home.module.css";

export default function Introducing() {
  const navigate = useNavigate();

  return (
    <div className={Style["container"]}>
      <p>fast-react-app</p>
      <ul className={Style["routeJump"]}>
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/introducing")}>Introducing</li>
      </ul>
    </div>
  );
}`;
}
