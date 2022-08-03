const fs = require("fs");
// 创建目录 mkdir
fs.mkdir("./test", (err) => {
  console.log(err);
});
