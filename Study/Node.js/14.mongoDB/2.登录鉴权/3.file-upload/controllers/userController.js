/**
 *      MVC架构中的C层，负责M层与V层的数据交接
 */
const userService = require("../services/userService");
const JWT = require("../utils/jwt");

const userController = {
  register: async (req, res) => {
    console.log(req.file, "file");
    console.log(req.body);
    const { username, password } = req.body;
    const avatar = req.file ? `/${req.file.filename}` : undefined;
    await userService.register(username, password, avatar);
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
      // 设置token
      const token = JWT.sign(user[0]._id, "7days");
      // 一般是将token设置在header中
      res.header("Authorization", token);
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
