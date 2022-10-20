import mongoose from "mongoose";

/* 定义comment模型结构 */
const commentSchema = new mongoose.Schema({
  // 内容
  content: {
    type: String,
    required: true,
  },
  // 评论者
  commentator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // 评论的回答id
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
  // 隐藏__v版本信息
  __v: {
    type: Number,
    select: false,
  },
});

/* 创建comment模型 */
export default mongoose.model("Comment", commentSchema);
