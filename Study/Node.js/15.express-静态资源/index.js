const express = require("express");
const app = express();
const homeRouter = require("./router/homeRouter");
const loginRouter = require("./router/loginRouter");

/**
 *  配置静态资源
 *  - 若没有指定一个虚拟路径，则会自动以根目录为起点注册路由
 *
 */
// app.use("/public", express.static("public"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/home", homeRouter);
app.use("/login", loginRouter);

app.use((req, res) => {
  res.status(404).send("错误");
});

app.listen(8080, () => {
  console.log("监听中");
});
