import React, { Component } from "react";

export default class LifeCircle extends Component {
  constructor(params) {
    super();
    this.state = {
      value: "抽烟喝酒烫头",
    };
    // 废弃，在状态更新前执行
    // this.componentWillUpdate = () => {};

    // 运行时-componentDidUpdate，在状态更新后执行
    this.componentDidUpdate = (prevProps, prevState) => {
      // 该生命周期函数接收两个参数，都是未改变之前的Props和State，方便判断（二者都是只读不可修改）
      console.log(prevState.value, "状态已更新-componentDidUpdate");
    };

    // 运行时-shouldComponentUpdate（性能优化函数），取决于返回值
    //    若返回值为真，则会更新
    //    若返回值为假，则视图不会更新，且不会调用didUpdate和render
    this.shouldComponentUpdate = (nextProps, nextState) => {
      // 该生命周期函数接收两个参数，都是即将改变的Props和State，方便判断（二者都是只读不可修改）
      // this.state.value 访问的是旧的state
      // 若新旧state里有很多属性需要判断修改，可以通过JSON.stringify(this.state) !== JSON.stringify(nextState)
      if (this.state.value !== nextState.value) {
        console.log("新旧state不同，需要更新-shouldComponentUpdate");
        return true;
      } else {
        return false;
      }
    };

    // 废弃，只在子组件中生效。
    // 触发条件：子组件第一次创建时不会触发，当父组件状态发生改变时会触发（此时即使不传props也会触发）
    // 意义：最先获得父组件传来的props，做逻辑处理或者setState
    // this.componentWillReceiveProps = () => {};
  }

  // 运行中-render()也是一个生命周期函数，在里面不允许修改props和state
  render() {
    console.log("初始化有我，运行时也有我-render");
    return (
      <div>
        <div>LifeCircle-{this.state.value}-运行时</div>
        <button
          onClick={() => {
            this.setState({ value: this.state.value + "1" });
          }}
        >
          点我修改
        </button>
      </div>
    );
  }
}
