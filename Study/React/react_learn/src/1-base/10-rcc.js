import React, { Component } from "react";
// 引入属性校验包
import PropTypes from "prop-types";

export default class Rcc extends Component {
  // 属性校验---类组件中有一个静态属性，propTypes来校验this.props.[xxx]
  static propTypes = {
    // title: PropTypes.bool,
    title: PropTypes.string,
    time: PropTypes.string,
  };

  // 默认属性---类组件中有一个静态属性，defaultProps来设置当this.props.[xxx]为undefined时的值
  static defaultProps = {
    time: "2023-1-1",
  };

  render() {
    // 子组件可以通过this.props拿到父组件传递的props参数
    console.log(this.props);
    return (
      <div>
        <p>{this.props.title}</p>
        <p>{this.props.time}</p>
      </div>
    );
  }
}
console.log(PropTypes);
