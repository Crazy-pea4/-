import React, { Component } from "react";

export default class App extends Component {
  state = {
    controlInputValue: "this is a text",
  };
  render() {
    return (
      <div>
        {/* 
        非受控：
            与原生input标签不同，我们要展示默认值是使用属性defaultValue，而不是value
            如果使用value相当于把input值写死了
        */}
        <input type="text" defaultValue="defaultValue"></input>
        <br></br>

        {/* 
        受控：
            将value属性值用{}访问变量，再通过onChange动态赋值。这就是受控概念
        */}
        <input
          type="text"
          value={this.state.controlInputValue}
          onChange={(e) => {
            this.setState({ controlInputValue: e.target.value });
          }}
        ></input>
      </div>
    );
  }
}
