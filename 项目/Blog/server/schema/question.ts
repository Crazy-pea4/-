import mongoose from "mongoose";

/* 定义question模型结构 */
const questionSchema = new mongoose.Schema(
  {
    // 标题
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    // 描述
    descriptions: {
      type: String,
      required: true,
      maxLength: 500,
    },
    // 提出问题者
    questioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
    // 问题所关联的话题
    topics: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
      select: false,
    },
    // 隐藏__v版本信息
    __v: {
      type: Number,
      select: false,
    },
  },
  { timestamps: true }
);

/* 创建question模型 */
export default questionSchema;
