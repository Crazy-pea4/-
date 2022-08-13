// 生成router实例，在其中编写路由规则
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("进入login路由级别中间件");
  next();
});

router.get("/", (req, res) => {
  // 使用res.render方法渲染模板
  res.render("login", { title: "some words" });
});

router.post("/validate", (req, res) => {
  if (req.body.username != "" && req.body.password != "") {
    // res.send("登陆成功");
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
