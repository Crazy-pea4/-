import { Router } from "express";
const router = Router();

/* 引入userController */
import userController from "../controller/user";

/* 引入中间件 */
import validate from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import checkExisted from "../middleware/checkExisted";

/* 引入注册校验工具 */
import { userRegisterValidator } from "../utils/validator";

// 注册
router.post("/", validate(userRegisterValidator), userController.register);

// 获取用户列表
router.get("/", userController.getUserList);

// 获取指定用户
router.get("/:id", checkExisted.user, userController.getUser);

// 编辑修改指定用户，因为这里为了使用patch节省带宽，就无法使用validate中间件校验
router.patch("/:id", authenticate, checkExisted.user, userController.editUser);

// 删除指定用户
router.delete(
  "/:id",
  authenticate,
  checkExisted.user,
  userController.deleteUser
);

// 关注（id为被关注人的id）
router.put(
  "/following/:id",
  authenticate,
  checkExisted.user,
  userController.follow
);

// 取消关注（id为被取消关注人的id）
router.delete(
  "/following/:id",
  authenticate,
  checkExisted.user,
  userController.unfollow
);

// 获取关注列表（id为当前用户）
router.get("/:id/following", checkExisted.user, userController.getFollowing);

// 获取粉丝列表（id为当前用户）
router.get("/:id/followers", checkExisted.user, userController.getFollowers);

// 关注话题（id为被关注话题的id）
router.put(
  "/topicFollowing/:id",
  authenticate,
  checkExisted.topic,
  userController.followTopic
);

// 取消关注话题（id为被取消关注话题的id）
router.delete(
  "/topicFollowing/:id",
  authenticate,
  checkExisted.topic,
  userController.unfollowTopic
);

// 获取关注话题列表（id为当前用户）
router.get(
  "/:id/topicFollowing",
  checkExisted.topic,
  userController.getTopicFollowing
);

// 获取用户的问题列表（id为当前用户）
router.get("/:id/questions", userController.getUserQuestions);

export default router;
