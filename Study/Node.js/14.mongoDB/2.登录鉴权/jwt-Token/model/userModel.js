const mongoose = require("mongoose");

// 规范类
const Schema = mongoose.Schema;
const userType = {
  username: String,
  password: String,
};

// 创建模型，且使用规范
const userModel = mongoose.model("user", new Schema(userType));
// 模型user将会对应users集合。都会在后面加一个s
module.exports = userModel;
