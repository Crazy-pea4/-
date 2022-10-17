import mongoose from "mongoose";

/* 定义answer模型结构 */
const answerSchema = new mongoose.Schema({
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 回答者
  answerer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false,
  },
  // 对应问题的id
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
    select: false,
  },
  // 隐藏__v版本信息
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Answer", answerSchema);
