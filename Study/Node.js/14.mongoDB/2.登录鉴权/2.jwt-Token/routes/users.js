const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 注册
router.post("/user", userController.register);
// 修改
router.put("/user/:id", userController.update);
// 删除
router.delete("/user/:id", userController.delete);

router.get("/user/list", userController.getUserList);

// 登录校验
router.post("/login", userController.login);

// 退出登录
router.get("/logout", userController.logout);

module.exports = router;
