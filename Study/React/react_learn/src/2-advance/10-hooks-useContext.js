import React, { useContext } from "react";

// useContext也需要配合React.createContext使用
const globalContext = React.createContext();

export default function Provider() {
  return (
    // 用返回的context.Provider标签包裹，value属性必须
    // 这里还是跟类组件一样需要用<globalContext.Provider>标签包裹
    <globalContext.Provider value={"hello"}>
      <div>我是供应商</div>
      <div>顾客必须处于供应商的服务范围内，子孙曾孙都可</div>
      <Customer></Customer>
    </globalContext.Provider>
  );
}

function Customer() {
  // 这里将服务商对外暴露的Context传入useContext
  const str = useContext(globalContext);
  return (
    // <globalContext.Consumer>
    //   {(value) => {
    //     console.log(value);
    //     return <div>我是顾客，这是供应商给我的-{value}</div>;
    //   }}
    // </globalContext.Consumer>
    <div>
      <p>顾客-----------------------</p>
      <div>我是顾客，这是供应商给我的-{str}</div>
    </div>
  );
}
