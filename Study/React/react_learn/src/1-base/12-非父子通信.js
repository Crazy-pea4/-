import React, { Component } from "react";

// 状态提升（兄弟之间以父组件作为桥梁）
export default class App extends Component {
  state = {
    Son1State: "",
  };
  render() {
    const toSon1 = (val) => {
      this.setState({ Son1State: val });
    };
    return (
      <div>
        {/* 状态提升 */}
        <div>
          <Son1 toSon1={toSon1}></Son1>
          <Son2 val={this.state.Son1State}></Son2>
        </div>
        {/* context */}
        <div>
          <Provider></Provider>
        </div>
      </div>
    );
  }
}

class Son1 extends Component {
  render() {
    return (
      <div>
        <p>我是兄弟组件1</p>
        <button
          onClick={() => {
            this.props.toSon1(new Date().toUTCString());
          }}
        >
          点我获取最新时间
        </button>
      </div>
    );
  }
}

class Son2 extends Component {
  render() {
    return (
      <div>
        <p>我是兄弟组件2，我们通过状态提升来通信</p>
        {this.props.val}
      </div>
    );
  }
}

// pubsub-js

// context
const globalContext = React.createContext();

class Provider extends Component {
  render() {
    return (
      // 用返回的context.Provider标签包裹，value属性必须
      <globalContext.Provider value={"hello"}>
        <div>我是供应商</div>
        <div>顾客必须处于供应商的服务范围内，子孙曾孙都可</div>
        <Customer></Customer>
      </globalContext.Provider>
    );
  }
}

class Customer extends Component {
  render() {
    return (
      <globalContext.Consumer>
        {(value) => {
          console.log(value);
          return <div>我是顾客，这是供应商给我的-{value}</div>;
        }}
      </globalContext.Consumer>
    );
  }
}
