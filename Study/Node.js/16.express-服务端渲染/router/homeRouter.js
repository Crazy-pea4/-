// 生成router实例，在其中编写路由规则
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("进入home路由级别中间件");
  next();
});

router.get("/", (req, res) => {
  // res.send("home");
  let list = [11, 22, 33];
  res.render("home", { list });
});

router.get("/list", (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 7, 8]);
});

module.exports = router;
