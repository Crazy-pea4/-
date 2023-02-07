import React from "react";
import { useParams } from "react-router-dom";

export default function Page2() {
  // 使用useParams获取Params参数（路由参数）
  const { id } = useParams();
  return (
    <div>
      <h2>Page2</h2>
      <div>Page2-{id}</div>
    </div>
  );
}
