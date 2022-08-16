// 生成router实例，在其中编写路由规则
const express = require("express");
const router = express.Router();

router.use(() => {
  console.log("进入路由级别中间件");
});

router.get("/home", (req, res) => {
  res.send("home");
});

router.get("/login", (req, res) => {
  res.send("login");
});

// 将router导出
module.exports = router;
