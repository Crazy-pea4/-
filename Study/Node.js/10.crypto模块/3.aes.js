const crypto = require("crypto");

// 加密
function encrypt(key, iv, data) {
  // 创建加密类
  let enp = crypto.createCipheriv("aes-128-cbc", key, iv);
  return enp.update(data, "binary", "hex") + enp.final("hex");
}
// 解密
function decrypt(key, iv, crypted) {
  // 将加密后的数据先转成buffer对象，然后再toString成二进制形式
  crypted = Buffer.from(crypted, "hex").toString("binary");
  // 创建解密类
  let dep = crypto.createDecipheriv("aes-128-cbc", key, iv);

  return dep.update(crypted, "binary", "utf-8") + dep.final("utf-8");
}

// 16*8 = 128
let key = "abcdefghijklmnop";
let iv = "123456ghijklmnop";
let data = "yarh";

let crypted = encrypt(key, iv, data);
console.log("加密----", crypted);

let decrypted = decrypt(key, iv, crypted);
console.log("解密----", decrypted);
