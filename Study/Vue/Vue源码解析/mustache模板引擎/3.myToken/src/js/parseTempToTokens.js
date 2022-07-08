import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

/**
 * 将模板字符串变为tokens数组
 */

export default function parseTempToTokens(tempStr) {
  let tokens = [];
  // 创建扫描器
  let scanner = new Scanner(tempStr);
  let str;
  while (scanner.pos !== tempStr.length) {
    str = scanner.scanUntil("{{");
    // 将一般字符串存入tokens数组
    tokens.push(["text", str]);
    scanner.scan("{{");
    str = scanner.scanUntil("}}");
    // 到底了，还会执行一次scanUntil，只是返回的是''。把这一情况过滤掉
    if (str !== "") {
      // 判断{{}}里的首字符是否是'#'
      if (str[0] == "#") {
        tokens.push(["#", str.substring(1)]);
        // 判断{{}}里的首字符是否是'/'
      } else if (str[0] == "/") {
        tokens.push(["/", str.substring(1)]);
      } else {
        // 将目标字符串存入tokens数组
        tokens.push(["name", str]);
      }
    }
    scanner.scan("}}");
  }
  return nestTokens(tokens);
}
