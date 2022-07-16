/**
 * 将tokens数组转变为DOM字符串
 */
import lookUp from "./lookUp";

export default function renderTemp(tokens, data) {
  let result = "";
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (token[0] === "text") {
      result += token[1];
    } else if (token[0] === "name") {
      // 情况：不循环
      result += lookUp(data, token[1]);
    } else if (token[0] === "#") {
      // 情况：嵌套数组
      let d = lookUp(data, token[1]);
      for (let i = 0; i < d.length; i++) {
        // 针对于数据只有一层的简单情况
        result += renderTemp(token[2], {
          // 补充一个keyName "."
          ".": d[i],
          ...d[i],
        });
      }
    }
  }
  return result;
}
