import React, { Component } from "react";

export default class ref extends Component {
  myRef = React.createRef();
  render() {
    return (
      <div>
        <input ref={this.myRef}></input>
        <button
          onClick={() => {
            // console.dir(this.refs.pElement.value); // 这种通过this.refs访问有些bug
            console.log(this.myRef); // {current: $(target)}
          }}
        >
          Click me! and see console
        </button>
      </div>
    );
  }
}
