import { Router } from "express";
const router = Router();

// 引入answerController
import answerController from "../controller/answer";

/* 引入中间件 */
import validate from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import checkExisted from "../middleware/checkExisted";

/* 引入创建问题校验工具 */
import { answerCreateValidator } from "../utils/validator";

// 创建问题
router.post(
  "/",
  authenticate,
  validate(answerCreateValidator),
  answerController.createAnswer
);

// 修改问题
router.patch(
  "/:id",
  authenticate,
  checkExisted.answer,
  checkExisted.answerer,
  answerController.updateAnswer
);

// 查询问题列表
router.get("/", answerController.getAnswerList);

// 查询指定问题
router.get("/:id", checkExisted.answer, answerController.getAnswer);

// 查询问题粉丝列表
router.get(
  "/:id/followers",
  checkExisted.answer,
  answerController.getAnswerFollowers
);

// 删除指定问题
router.delete(
  "/:id",
  authenticate,
  checkExisted.answer,
  checkExisted.answerer,
  answerController.deleteAnswer
);

export default router;
