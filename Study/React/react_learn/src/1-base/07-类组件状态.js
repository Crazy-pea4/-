import React, { Component } from "react";

export default class classState extends Component {
  /**
   *    两种方式使用类组件的状态
   */
  //   constructor() {
  //     super();
  //     this.state = {
  //       text: "hello",
  //     };
  //   }
  state = {
    text: "Like",
    num: 1,
  };
  /**
   *   1.多次调用setState，发现num只+1
   *   2.setState是异步更新状态
   */
  multiMutateState = () => {
    this.setState(
      {
        num: this.state.num + 1,
      },
      () => {
        console.log(this.state.num); // 2 状态更新完后调用该回调
      }
    );
    console.log(this.state.num); // 1 这行同步执行，打印结果比上面的先
    // this.setState({
    //   num: this.state.num + 1,
    // });
    // this.setState({
    //   num: this.state.num + 1,
    // });
  };
  render() {
    return (
      <div>
        <h1>welcome</h1>
        <button
          onClick={() => {
            if (this.state.text === "Like") {
              this.setState({ text: "UnLike" });
            } else {
              this.setState({ text: "Like" });
            }
          }}
        >
          {this.state.text}
        </button>
        <div>
          <span>{this.state.num}</span>
          <button onClick={this.multiMutateState}>add</button>
        </div>
      </div>
    );
  }
}
