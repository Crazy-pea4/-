const express = require("express");
const app = express();
const router = require("./router2/index");

// 挂载router，第一个参数表示匹配的根路径
app.use("/", router);

/**
 *  值得注意的是：一般开发大型项目会有很多的路由，统一卸载一个router.js中会显得庞大冗余
 *  这种情况下可以分开不同模块编写。例如：
 *  app.use("/home", homeRouter);
 *  app.use("/login", loginRouter);
 *  ...
 *  app.use("/xxx", xxxRouter);
 */

app.listen(8080, () => {
  console.log("服务器打开，监听中");
});
