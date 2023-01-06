import React, { Component } from "react";
import "./css/04-插值表达.css";

export default class App extends Component {
  render() {
    let name = "yarh";
    let style = {
      color: "blue",
      // 驼峰写法
      fontSize: "30px",
    };
    return (
      <div>
        <div>
          {10 + 10}, i am {name}
        </div>
        <i style={style}>this is blue</i>
        <p className="test">test class</p>
      </div>
    );
  }
}
