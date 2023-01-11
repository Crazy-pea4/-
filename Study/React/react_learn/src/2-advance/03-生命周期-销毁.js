import React, { Component } from "react";

export default class LifeCircle extends Component {
  constructor(params) {
    super();
    this.state = {
      isCreated: true,
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ isCreated: !this.state.isCreated });
          }}
        >
          销毁
        </button>
        {this.state.isCreated && <Child></Child>}
      </div>
    );
  }
}

class Child extends Component {
  constructor() {
    super();
    this.componentWillUnmount = () => {
      console.log("Child组件销毁啦-componentWillUnmount");
    };
  }

  render() {
    return (
      <div>
        <span>我是孩子组件</span>
      </div>
    );
  }
}
