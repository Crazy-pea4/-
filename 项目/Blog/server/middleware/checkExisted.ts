/* 引入express中间件函数声明 */
import { RequestHandler } from "express";

/* 引入userModel topicModel */
import userModel from "../model/user";
import topicModel from "../model/topic";

export const checkUserExisted: RequestHandler = async function (
  req,
  res,
  next
) {
  // 获取目标id
  const id = req.params.id;
  const user = await userModel.findById(id);
  if (!user)
    return res.status(404).json({
      code: 404,
      message: "用户不存在",
    });
  else next();
};

export const checkTopicExisted: RequestHandler = async function (
  req,
  res,
  next
) {
  // 获取目标hid
  const id = req.params.id;
  const topic = await topicModel.findById(id);
  if (!topic)
    return res.status(404).json({
      code: 404,
      message: "话题不存在",
    });
  else next();
};
