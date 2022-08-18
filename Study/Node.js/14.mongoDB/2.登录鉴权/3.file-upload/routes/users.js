const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require("../controllers/userController");
// 处理 multipart/form-data 类型的表单数据
const multer = require("multer");
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

// 注册
router.post("/user", upload.single("avatar"), userController.register);
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
