const fs = require("fs");
// 删除文件 unlink
fs.unlink("./test/a.txt", (err) => {
  console.log(err);
});
