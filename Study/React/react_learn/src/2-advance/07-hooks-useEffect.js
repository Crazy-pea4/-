import React, { useState, useEffect } from "react";

export default function App() {
  const [name, setName] = useState("yarh");
  /**
   * 相当于watchEffect，只不过这里需要用第二个参数数组里写上需要监听的依赖
   *    用到什么变量就监听什么依赖
   *
   * 第一个参数是监听函数，第二个参数是依赖数组
   *    监听函数在 初始化 和监听的依赖 发生改变时 会执行
   *
   * useEffect还可以返回一个函数，这个函数会在这个函数式组件销毁时执行
   *    用于删除一些像定时器之类的
   *
   *  *-useLayoutEffect：与useEffect执行时期不同。
   *      layoutEffect是在Dom上树但还没渲染时执行回调，effect是在页面渲染完后再调用的
   *      因此如果再effect回调中有操作DOM可能会造成页面抖动，把DOM操作放到layoutEffect中更合适
   *
   */
  useEffect(() => {
    setName(
      name.substring(0, name.length - 1) +
        name.substring(name.length - 1).toUpperCase()
    );

    // return () => { //里面可以写一些组件销毁时要做的事情 }
  }, [name]);

  return (
    <div>
      <button
        onClick={() => {
          setName(name + "h");
        }}
      >
        点我改名字
      </button>
      <div>{name}</div>
    </div>
  );
}
