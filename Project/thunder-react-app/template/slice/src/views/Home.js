export default function () {
  return `import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeName, changeAge } from "@/store/reducer/userReducer";
import Style from "@/css/Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const { name, age } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className={Style["container"]}>
      <div>{name}</div>
      <button onClick={() => dispatch(changeName("-toolkit!"))}>
        changeName
      </button>
      <div>{age}</div>
      <button onClick={() => dispatch(changeAge())}>changeAge</button>
      <ul className={Style["routeJump"]}>
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/introducing")}>Introducing</li>
      </ul>
    </div>
  );
}`;
}
