import React, { useState } from "react";
import P from "./P";

export default function Portal() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        切换
      </button>
      {isShow ? <P></P> : ""}
    </div>
  );
}
