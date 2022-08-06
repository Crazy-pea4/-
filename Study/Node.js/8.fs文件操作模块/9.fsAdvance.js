// 当要删除的文件夹中有多个文件
const fs = require("fs");
// fs.readdir("./test", (err, files) => {
//   files.forEach((file) => {
//     fs.unlink(`./test/${file}`, (err) => {});
//   });
//   fs.rmdir("./test", (err) => {});
// });

/**
 *  如果按照上面的代码去执行，那么有概率会报错。因为.unlink是异步时间，下面的.rmdir是等带forEach结束后执行，并不是.unlink结束后
 *  所以有概率是执行到.rmdir时，还有文件没有被删除
 *
 * 由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。
 */

fs.readdir("./test", (err, files) => {
  files.forEach((file) => {
    // 解决方法就是使用同步方法
    fs.unlinkSync(`./test/${file}`, (err) => {});
  });
  fs.rmdir("./test", (err) => {});
});
