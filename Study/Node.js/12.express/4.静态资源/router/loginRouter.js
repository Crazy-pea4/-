// 生成router实例，在其中编写路由规则
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("进入login路由级别中间件");
  next();
});

router.get("/get", (req, res) => {
  // 获取get请求参数
  console.log(req.query);
  res.send("login");
});

// 解析post请求参数需要返回index.js配置中间件
router.post("/post", (req, res) => {
  // 配置完毕中间件后使用
  console.log(req.body);
  res.send({ ok: 1 });
});

module.exports = router;
