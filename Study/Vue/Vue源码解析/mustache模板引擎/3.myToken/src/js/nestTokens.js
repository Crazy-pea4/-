/**
 * 折叠函数，作用是折叠嵌套的tokens，把#和/之间的tokens整合起来放到下标为3的数组项
 */

export default function nestTokens(tokens) {
  console.log(tokens);
  let nestedTokens = [];
  // 新建一个栈，存放有嵌套的tokens
  let stack = [];

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    switch (token[0]) {
      case "#":
        // 给入栈的token这一数组中第3项放入一个数组
        token[2] = [];
        // 入栈
        stack.push(token);
        console.log(token[1] + "入栈");
        break;
      case "/":
        // 弹栈
        let section = stack.pop(token);
        console.log(token[1] + "出栈");
        if (stack.length === 0) {
          nestedTokens.push(section);
        } else {
          stack[stack.length - 1][2].push(section);
        }
        break;
      default:
        if (stack.length === 0) {
          nestedTokens.push(token);
        } else {
          stack[stack.length - 1][2].push(token);
        }
        break;
    }
  }
  return nestedTokens;
}
