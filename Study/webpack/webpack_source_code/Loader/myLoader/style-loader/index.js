module.exports = function (content) {
  //   const style = `
  //     const styleEle = document.createElement('style');
  //     styleEle.innerHTML = ${JSON.stringify(content)};
  //     document.head.appendChild(styleEle);
  //     `;
  //   return style;
};

module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩下还需要处理的loader
  // console.log(remainingRequest);

  const relativePath = remainingRequest
    .split("!")
    .map((abPath) => {
      // this.utils.contextify(绝对路径1, 绝对路径2)，返回第二个参数相对于第一个参数的相对路径
      return this.utils.contextify(this.context, abPath);
    })
    .join("!");
  console.log(relativePath); // ../../node_modules/css-loader/dist/cjs.js!./index.css

  // 创造片段
  const style = `
    import style from "!!${relativePath}"
    const styleEle = document.createElement('style');
    styleEle.innerHTML = style;
    document.head.appendChild(styleEle);
    `;

  // 终止后面loader（css-loader）的执行
  return style;
};
