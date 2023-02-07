import React, { useRef } from "react";
import Child from "./Child";

export default function App() {
  const inp = useRef();
  return (
    <div>
      <h2>ForWardRef</h2>
      <button
        onClick={() => {
          if (inp.current.value) inp.current.value = "";
          else inp.current.value = "123123";
        }}
      >
        控制子组件input值
      </button>
      {/* 在函数式组件中，若要向子组件传递ref，需要用到forwardRef函数 */}
      <Child ref={inp}></Child>
    </div>
  );
}
