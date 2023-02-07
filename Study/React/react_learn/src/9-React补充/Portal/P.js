import React from "react";
import { createPortal } from "react-dom";

export default function P() {
  // createPortal方法，第一个参数是JSX，第二个参数是要将这段JSX插入的页面DOM树节点
  return createPortal(
    <div>
      <p>React-Portal，将标签在顶层展现</p>
    </div>,
    document.body
  );
}
