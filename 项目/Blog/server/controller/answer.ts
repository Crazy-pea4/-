/* 引入声明文件 */
import AnswerController from "../@types/controller/answer";

/* 引入模型 */
import questionModel from "../model/question";
import answerModel from "../model/answer";

/* 引入jwt工具 */
import Jwt from "../utils/jwt";

const answerController: AnswerController = {
  // 创建回答
  createAnswer: async (req, res, next) => {
    try {
      // 获取请求体和questionId
      const info = req.body;
      const questionId = req.params.questionId;
      // 回答创建者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      // 整合进info中
      info.answerer = value;
      info.questionId = questionId;
      await answerModel.create(info);
      res.status(200).json({
        code: 200,
        message: "话题创建成功",
        data: info,
      });
    } catch (err) {
      next(err);
    }
  },
  // 修改回答
  updateAnswer: async (req, res, next) => {
    try {
      const id = req.params.id;
      const info = req.body;
      const answer = await answerModel.findByIdAndUpdate(id, info);
      if (answer) {
        res.status(200).json({
          code: 200,
          message: "回答修改成功",
          data: info,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "回答修改失败",
          data: answer,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询回答列表
  getAnswerList: async (req, res, next) => {
    try {
      // 获取页数page
      let { page = 0, limit = 10, keyword = "" } = req.query;
      page = Math.max((page as any) * 1, 1) - 1;
      // 限制每页有多少条数据
      limit = Math.max((limit as any) * 1, 0);

      // 获取questionId
      const questionId = req.params.questionId;
      const answerList = await answerModel
        // 实现模糊搜索，忽略大小写
        .find({ content: new RegExp(keyword as string, "i"), questionId })
        .select("+answerer")
        .populate("answerer")
        .limit(limit)
        .skip(page * limit);
      if (answerList) {
        res.status(200).json({
          code: 200,
          message: "查询回答列表成功",
          data: answerList,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询回答失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询指定回答
  getAnswer: async (req, res, next) => {
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
      console.log(detail);

      const answer = await answerModel
        .findById(id)
        .select(detail)
        .populate("answerer");
      if (answer) {
        res.status(200).json({
          code: 200,
          message: "查询指定回答成功",
          data: answer,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询指定回答失败",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询回答粉丝列表
  getAnswerFollowers: async (req, res, next) => {
    try {
      const id = req.params.id;
      const topicFollowersList = await questionModel
        .findById(id)
        .select("+topicFollowers")
        .populate("topicFollowers");
      if (topicFollowersList) {
        res.status(200).json({
          code: 200,
          message: "获取话题粉丝列表成功",
          data: topicFollowersList,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询话题粉丝列表失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 删除指定回答
  deleteAnswer: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await answerModel.findByIdAndDelete(id);
      if (data) {
        res.status(200).json({
          code: 200,
          message: "删除回答成功",
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "删除回答失败",
          data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

export default answerController;
