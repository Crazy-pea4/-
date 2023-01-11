import React, { useState, useRef } from "react";

export default function App() {
  const [str, setStr] = useState("hello world");
  const inp = useRef();

  return (
    <div>
      <input type="text" ref={inp}></input>
      <button
        onClick={() => {
          setStr(inp.current.value);
          inp.current.value = "";
        }}
      >
        提交
      </button>
      <div>{str}</div>
    </div>
  );
}
