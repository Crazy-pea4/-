/**
 * 将tokens数组转变为DOM字符串
 */

export default function renderTemp(tokens, data) {
  console.log(tokens, data);
  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token[0] === "text") {
      result += token[1];
    } else if (token[0] === "name") {
      // 情况：不循环
      result += data[token[1]];
    } else if (token[0] === "#") {
      // 情况：嵌套数组
      result += renderTemp(token[2], data.token[1]);
    }
  }
  return result;
}
