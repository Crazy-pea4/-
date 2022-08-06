/**
 *  fs还提供了Promise用法，只需要引入封装好的文件即可
 */

const fs = require("fs").promises;
fs.readdir("./test").then(async (files) => {
  // 等待所有的异步执行完毕后再执行下面代码。经典面试题
  // 1. 使用promise.all()
  //   let proArr = [];
  //   files.forEach((file) => {
  //     proArr.push(fs.unlink(`./test/${file}`));
  //   });
  //   await Promise.all(proArr);
  //   await fs.rmdir("./test");

  // 更简洁的写法
  await Promise.all(files.map((file) => fs.unlink(`./test/${file}`)));
  await fs.rmdir("./test");
});
