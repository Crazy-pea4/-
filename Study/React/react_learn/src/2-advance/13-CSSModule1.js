import React from "react";
import Page2 from "./13-CSSModule2";

/**
 * 为了避免不同组件引入不同样式会造成全局样式覆盖/污染（react会把引入的样式插入全局）
 *      使用CSSModule可以避免这类情况
 *  CSSModule是将类名变换为 文件名_类名_随机数 的形式
 */

// 要使用CSSModule需要 .module.css后缀命名文件
import Style from "./css/13-CSSModule.module.css";
console.log(Style);
// 引入后是一个对象，key是css样式名字，value是唯一的随机样式名字

export default function CSSModule() {
  return (
    <div>
      <Page1></Page1>
      <Page2></Page2>
    </div>
  );
}

function Page1() {
  return <h2 className={Style["color_darkcyan"]}>Page1</h2>;
  //   return <h2 className="color_darkcyan">Page1</h2>;
}
