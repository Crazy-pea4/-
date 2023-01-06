import React, { Component } from "react";

export default class LifeCircle extends Component {
  constructor(params) {
    super();
    this.state = {
      value: "",
    };
    // componentDidMount：会在dom上树后调用
    this.componentDidMount = () => {
      console.log("挂载了");
      this.setState({ value: "hello world" });
    };
  }
  render() {
    return <div>LifeCircle-{this.state.value}</div>;
  }
}
