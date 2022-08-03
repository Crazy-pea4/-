const fs = require("fs");
// 重命名 rename
fs.rename("./test", "./test2", (err) => {
  console.log(err);
});
