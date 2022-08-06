// 引包
const crypto = require("crypto");
// 第一个参数指明加密方式，第二个参数为密钥（自定义）
const hash = crypto.createHmac("md5", "yarh");
// 加密数据
hash.update("hello crypto");
// 选择输出的形式，hex
console.log(hash.digest("hex"));
