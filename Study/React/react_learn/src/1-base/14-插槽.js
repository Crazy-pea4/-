import React, { Component } from "react";

export default class slot extends Component {
  render() {
    return (
      <div>
        <Child>
          <p>我是p标签1~~~</p>
          <p>我是p标签2~~~</p>
          <p>我是p标签3~~~</p>
        </Child>
      </div>
    );
  }
}

class Child extends Component {
  render() {
    // 通过this.props.children访问。如果当成数组[number]来定位具体传入的参数就会单个显示
    return (
      <div>
        {this.props.children[0]}
        {this.props.children[1]}
        {this.props.children}
      </div>
    );
  }
}
