/* 引入声明文件 */
import UserController from "../@types/controller/user";

/* 引入user模型 */
import userModel from "../model/user";

/* 引入加密工具 */
import MD5_encrypt from "../utils/md5";

const userController: UserController = {
  // 注册
  register: async (req, res, next) => {
    try {
      let { phoneNumber, nickname, password } = req.body;
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
        await userModel.create({ phoneNumber, nickname, password });
        res.status(200).json({
          code: 200,
          message: "注册成功！",
        });
      }
    } catch (err: any) {
      next(err);
    }
  },
  // 获取用户列表
  getUserList: async (req, res, next) => {
    try {
      // 查询用户列表
      const userList = await userModel.find();
      if (userList) {
        res.status(200).json({
          code: 200,
          message: "用户列表查询成功",
          data: { userList },
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
  // 获取指定用户
  getUser: async (req, res, next) => {
    try {
      const _id = req.params.id;
      let user = await userModel.findById(_id);
      if (user) {
        res.status(200).json({
          code: 200,
          message: "查询用户成功",
          data: { user },
        });
      } else {
        res.status(404).json({
          code: 404,
          message: "用户不存在",
          data: { _id },
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
      // 查询用户（返回的是旧值）
      let oldUser = await userModel.findByIdAndUpdate(_id, body);
      if (oldUser) {
        res.status(200).json({
          code: 200,
          message: "编辑成功",
          data: { body },
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
          data: { deletedUser },
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
};

export default userController;
