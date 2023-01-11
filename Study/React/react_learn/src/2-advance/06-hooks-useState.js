import React, { useState } from "react";

export default function App() {
  /**
   * useState
   *  第一个数是目标数值
   *  第二个是改变这个数值的唯一方法
   *
   * 可以看出useState是记忆函数，即每次setAge后重新执行函数组件前会记住上一次更改的值
   */
  const [age, setAge] = useState(4);
  const [list, setList] = useState([1, 2, 3]);

  return (
    <div>
      <button
        onClick={() => {
          setList([...list, age]);
          setAge(age + 1);
        }}
      >
        +1
      </button>
      <div>
        <ul>
          {list.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
