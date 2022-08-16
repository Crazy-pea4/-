/**
 *      MVC架构中的C层，负责M层与V层的数据交接
 */
const userService = require("../services/userService");

const userController = {
  register: async (req, res) => {
    console.log(req.body);
    // 插入数据库
    /**
     *  创建一个模型（可以用来限制field类型。在model文件夹下）
     */
    const { username, password } = req.body;
    await userService.register(username, password);
    res.send({ code: 200 });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const { username, password } = req.body;
    await userService.update(id, username, password);
    res.send({ code: 202 });
  },
  delete: async (req, res) => {
    const id = req.params.id;
    await userService.delete(id);
    res.send({ code: 204 });
  },
  getUserList: async (req, res) => {
    const { page, limit } = req.query;
    let list = await userService.getUserList(page, limit);
    res.send(list);
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    if (user.length == 0) {
      res.send({ code: 404 });
    } else {
      req.session.user = user[0];
      res.send({ code: 200 });
    }
  },
  logout: (req, res) => {
    req.session.destroy(() => {
      res.send({ code: 200 });
    });
  },
};

module.exports = userController;
