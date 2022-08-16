const express = require("express");
const app = express();
const homeRouter = require("./router/homeRouter");
const loginRouter = require("./router/loginRouter");

// 配置解析post参数中间件 --- 支持x-www-form-urlencoded的form格式：a=1&b=2
app.use(express.urlencoded({ extended: false }));
// 配置解析post参数中间件 --- 支持application/json的json格式：{a:1,b:2}
app.use(express.json());

app.use("/home", homeRouter);
app.use("/login", loginRouter);

app.use((req, res) => {
  res.status(404).send("错误");
});

app.listen(8080, () => {
  console.log("监听中");
});
