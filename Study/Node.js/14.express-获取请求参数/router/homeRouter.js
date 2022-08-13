// 生成router实例，在其中编写路由规则
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("进入home路由级别中间件");
  next();
});

router.get("/", (req, res) => {
  res.send("home");
});

module.exports = router;
