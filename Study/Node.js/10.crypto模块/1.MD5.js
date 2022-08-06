// 引包
const crypto = require("crypto");
// 创建哈希加密，使用md5（sha1）加密方式
// const hash = crypto.createHash("sha1");
const hash = crypto.createHash("md5");
// 加密数据
hash.update("hello crypto");
// 选择输出的形式，hex
console.log(hash.digest("hex"));
