import React from "react";

import { Map } from "immutable";

export default function App() {
  const obj = Map({
    name: "yarh",
    age: 20,
  });
  // 返回一个加工过的对象
  console.log("immutable", obj);
  // 设置数据
  const handledObj = obj.set("name", "甄恒熙");
  console.log("set", handledObj);
  // 获取数据
  console.log("get", obj.get("name"), handledObj.get("name"));
  // toJS
  console.log("toJS", obj.toJS(), handledObj.toJS());

  return <div>immutable-基础用法</div>;
}
