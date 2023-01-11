import React, { Component } from "react";

export default class App extends Component {
  state = {
    name: "yarh",
  };

  // 初始化-运行时-getDerivedStateFromProps（替换componentWillReceiveProps）
  //    记住这句话：getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state
  static getDerivedStateFromProps(props, state) {
    // gdsfp返回一个对象，会对初始的state做合并处理（不是赋值）
    console.log(props, state);
    // 拦截setState修改状态前的值
    return {
      name: state.name.toUpperCase(),
    };
  }
  // （替换componentWillUpdate）
  //    因为willUpdate距离didUpdate执行有一段时间，这段时间会导致willUpdate中记录的数据不准确
  //    而getSnapshotBeforeUpdate非常接近didUpdate，避免了上面的情况（处在render和didUpdate之间）
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    return 11123; // 返回值搭配didUpdate使用，为第三个参数
  };

  componentDidUpdate(prevProps, prevState, value) {
    console.log("接收到了来自getSnapshotBeforeUpdate的返回值", value);
  }
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ name: this.state.name + "h" });
          }}
        >
          点我改名字
        </button>
        <div>App-{this.state.name}</div>
      </div>
    );
  }
}
