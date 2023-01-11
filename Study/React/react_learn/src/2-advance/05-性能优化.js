import React, { PureComponent } from "react";

/**
  * 1.shouldComponentUpdate
    控制组件自身或者子组件是否需要更新，尤其在子组件非常多的情况下，需要进行优化。

    2.PureComponent
    PureComponent:会帮你比较新props跟l旧的props,新的state和老的state(值相等，或者对象含有相同的属性、且属性值相等)，
    决定shouldComponentUpdate返回true或者false,从而决定要不要呼叫render function。
    注意：
        如果你的state或props『永远都会变』，那PureComponent并不会比较快，因为shallowEqual也需要花时间。
 */
export default class App extends PureComponent {
  state = {
    name: "yarh",
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("更新啦");
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({ name: this.state.name });
          }}
        >
          点击修改
        </button>
        <div>{this.state.name}</div>
      </div>
    );
  }
}
