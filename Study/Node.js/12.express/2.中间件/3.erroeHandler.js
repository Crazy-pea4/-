const express = require("express");
const app = express();
const homeRouter = require("./router3/homeRouter");
const loginRouter = require("./router3/loginRouter");

app.use("/home", homeRouter);
app.use("/login", loginRouter);

app.use((req, res) => {
  res.status(400).send("错误");
});

app.listen(8080, () => {
  console.log("监听中");
});
