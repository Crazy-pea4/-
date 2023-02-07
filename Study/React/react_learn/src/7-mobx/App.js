import React, { useState, useEffect } from "react";
import { autorun } from "mobx";
// 使用mobx-react后就不在需要手动把mobx数据和视图数据绑定
import { inject, observer } from "mobx-react";
import store from "./store";

function App(props) {
  // 使用useState的数据看成是视图UI展示的数据
  // const [age, setAge] = useState(props.store.age);
  // const [list, setList] = useState(props.store.list);
  // useEffect(() => {
  //   // 而store中的数据在react中并不直接与视图数据关联起来
  //   const unsubscribe = autorun(() => {
  //     setAge(props.store.age);
  //     setList(props.store.list);
  //   });

  //   return () => {
  //     // 组件销毁时 取消订阅
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <div>
      <div>age:{props.store.age}</div>
      <button
        onClick={() => {
          props.store.changeAge();
        }}
      >
        年龄+1
      </button>
      <div>list:{props.store.list}</div>
      <button
        onClick={() => {
          props.store.asyncAction([Math.floor(Math.random() * 10)]);
        }}
      >
        数组+1
      </button>
    </div>
  );
}
// 有点像react-redux
export default inject("store")(observer(App));
