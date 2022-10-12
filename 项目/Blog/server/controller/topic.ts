/* 引入声明文件 */
import TopicController from "../@types/controller/topic";

/* 引入topic模型 */
import topicModel from "../model/topic";

const topicController: TopicController = {
  // 创建话题
  createTopic: async (req, res, next) => {
    try {
      /**
       * 1. 检查话题是否已经存在 --> 若存在则不创建
       * 2. 若不存在则创建话题
       */
      const info = req.body;
      const topic = await topicModel.findOne({ topicName: info.topicName });
      if (!topic) {
        await topicModel.create(info);
        res.status(200).json({
          code: 200,
          message: "话题创建成功",
          data: info,
        });
      } else
        return res.status(400).json({
          code: 400,
          message: "话题已存在",
          data: info,
        });
    } catch (err) {
      next(err);
    }
  },
  // 修改话题
  updateTopic: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updateInfo = req.body;
      const topic = await topicModel.findByIdAndUpdate(id, updateInfo);
      if (topic) {
        res.status(200).json({
          code: 200,
          message: "话题修改成功",
          data: updateInfo,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "话题修改失败",
          data: topic,
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询话题列表
  getTopicList: async (req, res, next) => {
    try {
      // 获取页数page
      let { page = 0, limit = 10, keyword = "" } = req.query;
      page = Math.max((page as any) * 1, 1) - 1;
      // 限制每页有多少条数据
      limit = Math.max((limit as any) * 1, 0);
      const topicList = await topicModel
        // 实现模糊搜索，忽略大小写
        .find({ topicName: new RegExp(keyword as string, "i") })
        .limit(limit)
        .skip(page * limit);
      if (topicList) {
        res.status(200).json({
          code: 200,
          message: "查询话题列表成功",
          data: topicList,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询话题失败",
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询指定话题
  getTopic: async (req, res, next) => {
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
      let user = await topicModel.findById(id).select(detail);
      if (user) {
        res.status(200).json({
          code: 200,
          message: "查询指定话题成功",
          data: user,
        });
      } else {
        res.status(400).json({
          code: 400,
          message: "查询指定话题失败",
          data: { id },
        });
      }
    } catch (err) {
      next(err);
    }
  },
  // 查询话题粉丝列表
  getTopicFollowers: async (req, res, next) => {
    try {
      const id = req.params.id;
      const topicFollowersList = await topicModel
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
};

export default topicController;
