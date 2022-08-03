const fs = require("fs");
// 写入文件 writeFile
// 第三个参数options中的flag可以配置文件的打开方式 详情：https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#file-system-flags
fs.writeFile("./test/a.txt", "hello NodeJs", { flag: "a" }, (err) => {
  console.log(err);
});
