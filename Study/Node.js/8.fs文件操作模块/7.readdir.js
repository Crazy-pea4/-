const fs = require("fs");
// 读取文件夹 readdir
fs.readdir("./test", (err, files) => {
  console.log(err, files);
});
