import React, { Component } from "react";

export default class list extends Component {
  state = {
    list: [
      {
        id: 1,
        text: "yarh",
      },
      {
        id: 2,
        text: "blue",
      },
      {
        id: 3,
        text: "hi jack",
      },
      {
        id: 4,
        text: "balabala",
      },
    ],
    isShown: true,
  };
  render() {
    return (
      <div>
        <h2>列表渲染</h2>

        <ul>
          {this.state.list.map((i) => (
            <li key={i.id}>{i.text}</li>
          ))}
        </ul>
        <h2>条件渲染</h2>

        {/* 把JSX看成是一段js代码 */}
        {this.state.isShown ? <p>这是一段话</p> : null}
        <button
          onClick={() => {
            this.setState({ isShown: !this.state.isShown });
          }}
        >
          切换显示
        </button>
      </div>
    );
  }
}
