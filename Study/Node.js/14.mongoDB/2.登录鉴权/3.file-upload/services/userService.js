/**
 *      MVC架构中的M层，负责数据的获取
 */
const userModel = require("../model/userModel");

const userService = {
  register: (username, password, avatar) => {
    return userModel.create({ username, password, avatar });
  },
  update: (id, username, password) => {
    return userModel.updateOne({ _id: id }, { username, password });
  },
  delete: (id) => {
    return userModel.deleteOne({ _id: id });
  },
  getUserList: (page, limit) => {
    /**
     * .find({}, [target])
     * 第一个参数为匹配的数据，不写或空对象为全匹配
     * 第二个参数为匹配完毕后，筛选需要的值
     */
    return userModel
      .find({}, ["username", "password", "avatar"])
      .sort({ username: -1 });
    // .skip((page - 1) * limit)
    // .limit(limit)
  },
  login: (username, password) => {
    return userModel.find({ username, password });
  },
};

module.exports = userService;
