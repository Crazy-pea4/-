import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>登录页面</h2>
      <input type="text"></input>
      <button
        onClick={() => {
          sessionStorage.setItem("isAuth", "Hi i am here");
          navigate("/user");
        }}
      >
        登录
      </button>
    </div>
  );
}
