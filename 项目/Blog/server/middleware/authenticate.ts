/* 引入Jwt工具 */
import Jwt from "../utils/jwt";

/* 引入express中间件函数声明 */
import { RequestHandler } from "express";

export const authenticate: RequestHandler = function (req, res, next) {
  // 尝试从请求头部获取token
  const token = req.headers.token as string | undefined;
  const id = req.params.id;
  if (token) {
    // 若token存在，校验其是否过期
    try {
      // 如果解密后token和url上传入的id不同，则不是同一个人，不能修改
      const { value } = Jwt.verify(token);
      if (value === id) next();
      else throw "";
    } catch (err) {
      res.status(401).json({
        code: 401,
        message: "Token无效，请重新登录",
      });
    }
  } else {
    res.status(400).json({
      code: 400,
      message: "Token not found",
    });
  }
};

export default authenticate;
