/* 引入声明文件 */
import CommentController from "../@types/controller/comment";

/* 引入comment模型 */
import commentModel from "../model/comment";

/* 引入jwt工具 */
import Jwt from "../utils/jwt";

const commentController: CommentController = {
  // 创建评论
  createComment: async (req, res, next) => {
    try {
      // 获取请求体和answerId
      const info = req.body;
      const { answerId } = req.params;

      // 评论创建者id
      const token = req.headers.token as string;
      const { value } = Jwt.verify(token);

      // 将commentator整合进info中
      info.commentator = value;
      info.answerId = answerId;

      await commentModel.create(info);
      res.status(200).json({
        code: 200,
        message: "评论创建成功",
        data: info,
      });
    } catch (err) {
      next(err);
    }
  },
  // 修改评论
  updateComment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const answerInfo = req.body;
      const answer = await commentModel.findByIdAndUpdate(id, answerInfo);
      if (answer) {
        res.status(200).json({
          code: 200,
          message: "评论修改成功",
          data: answerInfo,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "评论修改失败",
          data: answer,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询评论列表
  getCommentList: async (req, res, next) => {
    try {
      // 获取页数page
      let { page = 0, limit = 10 } = req.query;
      page = Math.max((page as any) * 1, 1) - 1;
      // 限制每页有多少条数据
      limit = Math.max((limit as any) * 1, 0);

      // 获取questionId answerId
      const { answerId } = req.params;
      const commentList = await commentModel
        // 实现模糊搜索，忽略大小写
        .find({ answerId })
        // .limit(limit)
        // .skip(page * limit)
        .populate("commentator");
      if (commentList) {
        res.status(200).json({
          code: 200,
          message: "查询评论列表成功",
          data: commentList,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询评论失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询指定评论
  getComment: async (req, res, next) => {
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

      const comment = await commentModel
        .findById(id)
        .select(detail)
        .populate("commentator");
      if (comment) {
        res.status(200).json({
          code: 200,
          message: "查询指定评论成功",
          data: comment,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询指定评论失败",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 删除指定评论
  deleteComment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await commentModel.findByIdAndDelete(id);
      if (data) {
        res.status(200).json({
          code: 200,
          message: "删除评论成功",
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "删除评论失败",
          data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};

export default commentController;
