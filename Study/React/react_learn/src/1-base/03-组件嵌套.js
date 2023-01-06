import React, { Component } from "react";

const Header = () => <p>i am Header</p>;
const Child = () => <p>i am Child</p>;
// 子组件中嵌套子组件，不能在父组件里面写成嵌套
const Body = () => (
  <div>
    i am Body, <Child></Child>
  </div>
);
const Footer = () => <p>i am Footer</p>;

export default class Test extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    );
  }
}
