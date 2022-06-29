import parseTempToTokens from "./js/parseTempToTokens";

window.myTemplateEngine = {
  render(tempStr, data) {
    // 启动安排头尾两端空格、换行
    tempStr = tempStr.trim();
    let tokens = parseTempToTokens(tempStr)
    console.log(tokens);
  },
};
