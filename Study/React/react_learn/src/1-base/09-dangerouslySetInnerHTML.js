import React, { Component } from "react";

export default class dangerouslySetInnerHTML extends Component {
  render() {
    return (
      <div>
        {/* 相当于v-html，解析字符串 */}
        <span
          dangerouslySetInnerHTML={{
            __html: "<b>setInnerHTML</b>",
          }}
        ></span>
      </div>
    );
  }
}
