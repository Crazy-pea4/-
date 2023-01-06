import React, { Component } from "react";
import Rcc from "./10-rcc";
import Rfc from "./10-rfc";

/**
 *    React中props的特点：
 *      1. 通过父传给子，在子内部是read-only不可更改
 *      2. 设置默认值，限制接收类型都在子内部
 */

export default class Props extends Component {
  render() {
    let obj = {
      title: "footer",
      time: "2022-12-66",
    };
    let handler = function (value) {
      console.log("我接受到了来自子组件的数据！", value);
    };

    return (
      <div>
        {/* 与vue类似，最常见的props传参（父传子） */}
        <div>
          <Rcc title="header" time="2022-12-23"></Rcc>
        </div>
        <div>
          <Rcc title="body"></Rcc>
        </div>
        <div>
          {/* 还能通过展开运算符传递 */}
          <Rcc {...obj}></Rcc>
        </div>
        {/* 函数式组件 */}
        <p>--------------------------函数式组件-----------------------------</p>
        <div>
          {/* 通过像子组件传递一个回调，实现（子传父） */}
          <Rfc bgColor="#45d7aa" handler={handler}></Rfc>
        </div>
      </div>
    );
  }
}
