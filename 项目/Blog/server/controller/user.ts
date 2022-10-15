/* 引入声明文件 */
import UserController from "../@types/controller/user";

/* 引入user模型、topic模型 question模型 */
import userModel from "../model/user";
import topicModel from "../model/topic";
import questionModel from "../model/question";

/* 引入加密工具 */
import MD5_encrypt from "../utils/md5";
import Jwt from "../utils/jwt";

const userController: UserController = {
  // 注册
  register: async (req, res, next) => {
    try {
      let { phoneNumber, nickname, password, gender, introduction, area } =
        req.body;
      // 查询数据库，以phoneNumber为唯一标识
      // 若找到则已被注册
      if (await userModel.findOne({ phoneNumber })) {
        return res.status(400).json({
          code: 400,
          message: "手机号已经被注册了，请重新输入",
        });
      } else {
        // 1.加密用户密码
        password = MD5_encrypt(password);
        // 2.添加用户数据进数据库
        await userModel.create({
          phoneNumber,
          nickname,
          password,
          gender,
          introduction,
          area,
        });
        res.status(200).json({
          code: 200,
          message: "注册成功！",
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 查询用户列表
  getUserList: async (req, res, next) => {
    try {
      // 查询用户列表
      const userList = await userModel.find();
      if (userList) {
        res.status(200).json({
          code: 200,
          message: "用户列表查询成功",
          data: userList,
        });
      } else {
        return res.status(404).json({
          code: 404,
          message: "用户列表不存在",
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 查询指定用户
  getUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      // 获取用户详细信息时，使用?detail=xxx的形式
      let detail = req.query.detail as string;
      if (detail) {
        detail = detail
          .split(";")
          .map((item) => " +" + item)
          .join("");
      }
      // .select()方法 https://mongoosejs.com/docs/api/query.html#query_Query-select
      let user = await userModel.findById(id).select(detail);
      if (user) {
        res.status(200).json({
          code: 200,
          message: "查询用户成功",
          data: user,
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 编辑指定用户
  editUser: async (req, res, next) => {
    try {
      const _id = req.params.id;
      const body = req.body;
      // 这里还需要把password加密一下，否则登陆时的加密比对会不成功，并且在数据库中也是明文存储
      body.password = MD5_encrypt(body.password);
      // 查询用户（返回的是旧值）
      let oldUser = await userModel.findByIdAndUpdate(_id, body);
      if (oldUser) {
        res.status(200).json({
          code: 200,
          message: "编辑成功",
          data: body,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "编辑用户失败",
          data: { _id },
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 删除指定用户
  deleteUser: async (req, res, next) => {
    try {
      const _id = req.params.id;
      // 删除用户用户（返回删除的用户）
      let deletedUser = await userModel.findByIdAndDelete(_id);
      if (deletedUser) {
        res.status(200).json({
          code: 200,
          message: "删除用户成功",
          data: deletedUser,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "删除用户失败",
          data: { _id },
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 关注（往被关注的人的粉丝列表添加关注者id）
  follow: async (req, res, next) => {
    try {
      // 被关注的人id
      const id = req.params.id;
      // 关注者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      /**
       * 若 被关注的人 的followers粉丝列表中没有关注者id，则可以关注，
       * 否则不能重复关注
       */
      // 获取 被关注的人 的粉丝列表
      const user = await userModel.findById(id).select("+followers");
      // 被关注的人 的粉丝列表已存在 关注者 则返回关注失败信息
      if (user?.followers.includes(value))
        return res.status(400).json({
          code: 400,
          message: "已关注用户，不能重复关注",
        });
      else {
        // 向 被关注的人 的粉丝列表添加 关注者id
        await userModel.updateOne(
          { _id: id },
          // $addToSet和$push的区别是：前者不会重复添加
          { $addToSet: { followers: value } }
        );
        // 向 关注者 的关注列表添加 被关注的人id
        await userModel.updateOne(
          { _id: value },
          { $addToSet: { following: id } }
        );
        res.status(200).json({
          code: 200,
          message: "关注用户成功",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 取消关注
  unfollow: async (req, res, next) => {
    try {
      // 被取消关注的人id
      const id = req.params.id;
      // 取消关注者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      /**
       * 若 被取消关注的人 的followers粉丝列表中没有关注者id，则不可以取消关注，
       * 否则可以取消关注
       */
      // 获取 被取消关注的人 的粉丝列表
      const user = await userModel.findById(id).select("+followers");
      // 被取消关注的人 的粉丝列表不存在 关注者 则返回取消关注失败信息
      if (!user?.followers.includes(value))
        return res.status(400).json({
          code: 400,
          message: "还未关注用户，不能取消关注",
        });
      else {
        // 向 被关注的人 的粉丝列表移除 关注者id
        await userModel.updateOne({ _id: id }, { $pull: { followers: value } });
        // 向 关注者 的关注列表移除 被关注的人id
        await userModel.updateOne({ _id: value }, { $pull: { following: id } });
        res.status(200).json({
          code: 200,
          message: "取消关注用户成功",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询关注列表
  getFollowing: async (req, res, next) => {
    try {
      const id = req.params.id;
      const followingList = await userModel
        .findById(id)
        .select("+following")
        .populate("following");
      console.log(followingList);
      if (followingList) {
        res.status(200).json({
          code: 200,
          message: "获取关注列表成功",
          data: followingList,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询粉丝列表
  getFollowers: async (req, res, next) => {
    try {
      const id = req.params.id;
      const followersList = await userModel
        .findById(id)
        .select("+followers")
        .populate("followers");
      if (followersList) {
        res.status(200).json({
          code: 200,
          message: "获取粉丝列表成功",
          data: followersList,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 关注话题
  followTopic: async (req, res, next) => {
    try {
      // 被关注的话题id
      const id = req.params.id;
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      // 获取 被关注话题的 粉丝列表
      const user = await topicModel.findById(id).select("+topicFollowers");
      // 被关注的话题 的粉丝列表已存在 关注者 则返回关注失败信息
      if (user?.topicFollowers.includes(value))
        return res.status(400).json({
          code: 400,
          message: "已关注话题，不能重复关注",
        });
      else {
        // 向 被关注的话题 的粉丝列表添加 关注者id
        await topicModel.updateOne(
          { _id: id },
          // $addToSet和$push的区别是：前者不会重复添加
          { $addToSet: { topicFollowers: value } }
        );
        // 向 关注者 的关注列表添加 被关注的话题id
        await userModel.updateOne(
          { _id: value },
          { $addToSet: { followingTopic: id } }
        );
        res.status(200).json({
          code: 200,
          message: "关注话题成功",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 取消关注话题
  unfollowTopic: async (req, res, next) => {
    try {
      // 被取消关注的话题id
      const id = req.params.id;
      // 取消关注者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      // 获取 被取消关注的话题 的粉丝列表
      const user = await topicModel.findById(id).select("+topicFollowers");
      // 被取消关注的话题 的粉丝列表不存在 关注者 则返回取消关注失败信息
      if (!user?.topicFollowers.includes(value))
        return res.status(400).json({
          code: 400,
          message: "还未关注话题，不能取消关注",
        });
      else {
        // 向 被关注的话题 的粉丝列表移除 关注者id
        await topicModel.updateOne(
          { _id: id },
          { $pull: { topicFollowers: value } }
        );
        // 向 关注者 的关注列表移除 被关注的话题id
        await userModel.updateOne(
          { _id: value },
          { $pull: { followingTopic: id } }
        );
        res.status(200).json({
          code: 200,
          message: "取消关注话题成功",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询关注话题列表
  getTopicFollowing: async (req, res, next) => {
    try {
      const id = req.params.id;
      const topicFollowingList = await userModel
        .findById(id)
        .select("+followingTopic")
        .populate("followingTopic");
      console.log(topicFollowingList);
      if (topicFollowingList) {
        res.status(200).json({
          code: 200,
          message: "获取关注话题列表成功",
          data: topicFollowingList,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询用户的问题列表
  getUserQuestions: async (req, res, next) => {
    try {
      const id = req.params.id;
      const question = await questionModel.find({ questioner: id });
      if (question) {
        res.status(200).json({
          code: 200,
          message: "查询问题列表成功",
          data: question,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询问题列表失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
