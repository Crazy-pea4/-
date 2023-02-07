import React, { useState } from "react";

import { Map, List } from "immutable";

export default function App() {
  // 对象
  const obj = Map({
    name: "jack",
    age: 46,
    // 对象内部属性仍是对象，也需要用Map处理
    hobby: Map({
      basketball: true,
      swimming: true,
      bicycle: false,
    }),
  });
  const [immuObj, setImmuObj] = useState(obj);
  console.log(immuObj.get("hobby"));

  // 数组
  const arr = List([1, 2, 4]);
  const arr2 = arr.push(666); // 数组方法与原生类似
  const arr3 = arr2.shift();
  console.log(arr.toJS(), arr2.toJS(), arr3.toJS());

  return (
    <div>
      <button
        onClick={() => {
          // 不难看出，尽管只有一层封装，修改起来仍然需要繁杂的步骤
          setImmuObj(immuObj.set("age", immuObj.get("age") + 1));
          console.log(immuObj.toJS());
        }}
      >
        年龄+1
      </button>
      <p>{immuObj.toJS().age}</p>
    </div>
  );
}
