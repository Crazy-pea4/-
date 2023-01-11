import React, { useState, useCallback, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([1, 1]);
  /**
   * useCallback 记忆函数，防止组件因为状态改变重新渲染而造成重复创建函数。当第二个参数中依赖没有改变时，使用缓存函数。优化性能
   *    第一个参数：要记忆/缓存的回调
   *    第二个参数：要记忆的变量/依赖
   *
   *  当每次调用handleCount时，缓存函数中用到的变量都是上一次缓存时写进去的依赖
   *
   */
  const handleCount = useCallback(() => {
    setCount(count + 1); // 如果这里不把count写入缓存，那么点击按钮只能加到1，因为每次使用缓存函数，里面的count都是0
  }, [count]);

  /**
   * useMemo 记忆组件，基础用法与useCallback类似。
   *    不同的是useMemo会执行第一个参数（回调）并返回结果
   *  主要用处跟Vue computed差不多，只不过这里要手动输入依赖，每当依赖改变就会重新执行回调并返回结果
   */

  const handleList = useMemo(
    () => () => {
      setList([...list, 1]);
    },
    [list]
  );

  return (
    <div>
      <button
        onClick={() => {
          handleCount();
        }}
      >
        +1
      </button>
      <div>{count}</div>
      {/* --------------------------------- */}
      <button
        onClick={() => {
          handleList();
        }}
      >
        新增
      </button>
      <div>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
