import React, { Component } from "react";

/**
 *    React事件绑定不会绑定到具体的Dom元素上，而是采用事件代理（委托）的方式，绑在了Root节点上
 */

export default class App extends Component {
  render() {
    return (
      <div>
        <input type={"text"}></input>
        <button
          onClick={() => {
            console.log(this);
          }}
        >
          add
        </button>

        <br></br>
        <button onClick={this.handleClick1}>触发函数定义1</button>

        <br></br>
        <button onClick={this.handleClick2}>触发函数定义2</button>

        {/* 推荐写法（适合传参） */}
        <br></br>
        <button onClick={() => this.handleClick3()}>触发函数定义2</button>
      </div>
    );
  }
  handleClick1() {
    console.log("handleClick1", this); // this = undefine
  }
  // es7
  handleClick2 = () => {
    console.log("handleClick2", this); // this = App实例
  };

  handleClick3 = () => {
    console.log("handleClick3", this); // this = App实例
  };
}
