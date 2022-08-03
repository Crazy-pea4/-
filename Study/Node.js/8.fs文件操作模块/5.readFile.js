const fs = require("fs");
// 读取文件 readFile
fs.readFile("./test/a.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(err);
  // 或者使用.toString("utf-8")
  console.log(data);
});
