/* 引入声明文件 */
import CheckExisted from "../@types/middleware/checkExisted";

/* 引入userModel topicModel */
import userModel from "../model/user";
import topicModel from "../model/topic";
import questionModel from "../model/question";

/* 引入加密工具 */
import Jwt from "../utils/jwt";

const checkExisted: CheckExisted = {
  user: async function (req, res, next) {
    // 获取目标id
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user)
      return res.status(404).json({
        code: 404,
        message: "用户不存在",
      });
    else next();
  },
  topic: async function (req, res, next) {
    // 获取目标id
    const id = req.params.id;
    const topic = await topicModel.findById(id);
    if (!topic)
      return res.status(404).json({
        code: 404,
        message: "话题不存在",
      });
    else next();
  },
  question: async function (req, res, next) {
    // 获取目标id
    const id = req.params.id;
    const question = await questionModel.findById(id);
    if (!question)
      return res.status(404).json({
        code: 404,
        message: "问题不存在",
      });
    else next();
  },
  questioner: async function (req, res, next) {
    // 获取问题id
    const id = req.params.id;
    // 获取用户id
    const token = req.headers.token as string;
    const { userId } = Jwt.verify(token);
    const question = await questionModel.findById(id);
    if (question?.questioner !== userId)
      return res.status(400).json({
        code: 400,
        message: "不是话题创建者，没有操作权限",
      });
    else next();
  },
};

export default checkExisted;
