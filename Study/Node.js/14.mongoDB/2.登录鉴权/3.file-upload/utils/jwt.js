const jwt = require("jsonwebtoken");
const secretKey = "luandade";
const JWT = {
  sign: (value, timeout) => {
    return jwt.sign(
      {
        data: value,
      },
      secretKey,
      { expiresIn: timeout }
    );
  },
  verify: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (err) {
      return false;
    }
  },
};

module.exports = JWT;
