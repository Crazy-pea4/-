/* 引入声明文件 */
import QuestionController from "../@types/controller/question";

/* 引入question模型 */
import questionModel from "../model/question";

/* 引入jwt工具 */
import Jwt from "../utils/jwt";

const questionController: QuestionController = {
  // 创建问题
  createQuestion: async (req, res, next) => {
    try {
      /**
       * 1. 检查话题是否已经存在 --> 若存在则不创建
       * 2. 若不存在则创建话题
       */
      const info = req.body;
      // 话题创建者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);
      // 将questioner整合进info中
      info.questioner = value;
      // 新建问题，问题可以重复
      await questionModel.create(info);
      res.status(200).json({
        code: 200,
        message: "话题创建成功",
        data: info,
      });
    } catch (err) {
      next(err);
    }
  },
  // 修改问题
  updateQuestion: async (req, res, next) => {
    try {
      const id = req.params.id;
      const questionInfo = req.body;
      const question = await questionModel.findByIdAndUpdate(id, questionInfo);
      if (question) {
        res.status(200).json({
          code: 200,
          message: "问题修改成功",
          data: questionInfo,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "问题修改失败",
          data: question,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询问题列表
  getQuestionList: async (req, res, next) => {
    try {
      // 获取页数page
      let { page = 0, limit = 10, keyword = "" } = req.query;
      page = Math.max((page as any) * 1, 1) - 1;
      // 限制每页有多少条数据
      limit = Math.max((limit as any) * 1, 0);
      const questionList = await questionModel
        // 实现模糊搜索，忽略大小写
        .find({
          $or: [
            { title: new RegExp(keyword as string, "i") },
            { descriptions: new RegExp(keyword as string, "i") },
          ],
        })
        .limit(limit)
        .skip(page * limit);
      if (questionList) {
        res.status(200).json({
          code: 200,
          message: "查询问题列表成功",
          data: questionList,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询问题失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询指定问题
  getQuestion: async (req, res, next) => {
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

      let question = await questionModel
        .findById(id)
        .select(detail)
        .populate("questioner topics");
      if (question) {
        res.status(200).json({
          code: 200,
          message: "查询指定问题成功",
          data: question,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询指定问题失败",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询问题粉丝列表
  getQuestionFollowers: async (req, res, next) => {
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
  // 删除指定问题
  deleteQuestion: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await questionModel.findByIdAndDelete(id);
      if (data) {
        res.status(200).json({
          code: 200,
          message: "删除问题成功",
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "删除问题失败",
          data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

export default questionController;
