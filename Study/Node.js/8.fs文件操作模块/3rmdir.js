const fs = require("fs");
// 删除文件夹 rmdir
fs.rmdir("./test2", (err) => {
  console.log(err);
});
