import React, { Component } from "react";

export default class LifeCircle extends Component {
  constructor(params) {
    super();
    this.state = {
      value: "",
    };
    // 初始化-componentDidMount：会在dom上树后调用
    this.componentDidMount = () => {
      console.log("挂载了-componentDidMount");
      this.setState({ value: "hello world" });
    };
    // （废弃）
    // this.componentWillMount = function() {}
  }
  // 初始化-render()也是一个生命周期函数，在里面不允许修改props和state
  render() {
    console.log("初始化有我，运行时也有我-render");
    return <div>LifeCircle-{this.state.value}-初始化</div>;
  }
}
