let http = require("http");

/**
 *      跨域解决方式---cors
 *      - 原理：给响应头加上Access-Control-Allow-Origin: *。表示允许所有域访问该服务器
 *      - 操作：在nodejs中直接使用相应方法设置响应头属性即可
 */

http
  .createServer((req, res) => {
    // 设置响应头信息：允许所有域访问
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(
      `${JSON.stringify({
        name: "myName",
        age: 19,
      })}`
    );
  })
  .listen(8080, () => {
    console.log("监听成功");
  });
