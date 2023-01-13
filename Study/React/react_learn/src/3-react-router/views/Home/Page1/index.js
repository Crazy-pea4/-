import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Page1() {
  // 使用useSearchParams获取当前query参数
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState("");
  const inputRef = useRef();

  return (
    <div>
      <h2>Page1</h2>
      <div>Page1-{searchParams.get("id")}</div>
      <br></br>
      <input
        ref={inputRef}
        value={id}
        onChange={() => setId(inputRef.current.value)}
      ></input>
      <button
        onClick={() => {
          setSearchParams({ id });
        }}
      >
        修改id参数
      </button>
    </div>
  );
}
