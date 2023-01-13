import React from "react";

import Style from "./css/13-CSSModule.module.css";
// 因为是根据将类名变换为 文件名_类名_随机数，所以有效阻挡了其他文件夹下的css文件的样式名污染

export default function Page2() {
  return <h2 className={Style["color_darkkhaki"]}>Page2</h2>;
}
