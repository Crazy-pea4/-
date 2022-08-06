const fs = require("fs");
// 查看文件（文件夹）状态 stat
fs.stat("./test/a.txt", (err, state) => {
  console.log(err, state);
  console.log(state.isFile(), state.isDirectory());
});
