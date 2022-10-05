import { Router } from "express";
const router = Router();

/* 引入userController */
import userController from "../controller/user";

/* 引入中间件 */
import validate from "../middleware/validate";
import authenticate from "../middleware/authenticate";

/* 引入注册校验函数 */
import { userRegisterValidator } from "../utils/validator";

// 注册
router.post("/", validate(userRegisterValidator), userController.register);

// 获取用户列表
router.get("/", userController.getUserList);

// 获取指定用户
router.get("/:id", userController.getUser);

// 编辑修改指定用户
router.put(
  "/:id",
  authenticate,
  validate(userRegisterValidator),
  userController.editUser
);

// 删除指定用户
router.delete("/:id", authenticate, userController.deleteUser);

export default router;
