import parseTempToTokens from "./js/parseTempToTokens";
import renderTemp from "./js/renderTemp";

window.myTemplateEngine = {
  render(tempStr, data) {
    // 启动安排头尾两端空格、换行
    tempStr = tempStr.trim();
    let tokens = parseTempToTokens(tempStr);
    let domStr = renderTemp(tokens, data);
    console.log(domStr);
  },
};
