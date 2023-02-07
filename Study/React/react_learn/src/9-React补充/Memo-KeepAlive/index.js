import React, { useState } from "react";
import Child from "./Child";

export default function App() {
  const [obj, setObj] = useState({ title: "Hello memo", age: 53 });
  return (
    <div>
      <div>{JSON.stringify(obj)}</div>
      <p>
        React.memo会根据子组件传入的props是否改变决定子组件是否重新渲染
        {"<Child title={obj.title}></Child>"}
      </p>
      <button
        onClick={() => {
          setObj({ ...obj, title: obj.title + "!" });
        }}
      >
        点我修改对象中的title
      </button>
      <button
        onClick={() => {
          setObj({ ...obj, age: obj.age + 1 });
        }}
      >
        点我修改对象中的age
      </button>
      <Child title={obj.title}></Child>
    </div>
  );
}
