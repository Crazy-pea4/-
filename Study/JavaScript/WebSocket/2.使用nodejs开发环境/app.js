const ws = require("nodejs-websocket");

// 每次有用户访问localhost:8000都会创建一个server实例
// https://github.com/sitegui/nodejs-websocket
const server = ws
  .createServer((connect) => {
    console.log("有人连接了服务器");
    connect.on("text", (res) => {
      let str = res + "\n";
      connect.send(str);
    });
    connect.on("close", () => {
      console.log("退出连接");
    });
    connect.on("error", (errObj) => {
      // console.log(errObj);
    });
  })
  .listen(8000, () => {
    console.log("服务器监听中");
  });
