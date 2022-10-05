import jwt from "jsonwebtoken";

/* 引入配置文件 */
import config from "../config/index";

/* 引入声明文件 */
import JWT from "../@types/utils/jwt";

const Jwt: JWT = {
  sign: (value, timeout) => {
    return jwt.sign({ value }, config.secret, { expiresIn: timeout });
  },
  verify(token) {
    return jwt.verify(token, config.secret);
  },
};

export default Jwt;
