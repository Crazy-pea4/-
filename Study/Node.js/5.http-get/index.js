let http = require("http");
let https = require("https");

/**
 *  使用nodejs作为中间层（客户端）
 *  在开发过程中，我们可以选择nodejs来作为中间层替我们处理一些返回数据的问题。
 *  - 因为服务器（nodejs创建）与服务器之间通讯不存在浏览器与服务器之间通讯的问题
 */

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // 为了防止耦合度过高，不将res传递过去而是传递一个函数
    httpsGet((data) => {
      res.end(data);
    });
  })
  .listen(8080, () => {
    console.log("监听成功");
  });

function httpsGet(cb) {
  let data = "";
  https.get(
    "https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0",
    (res) => {
      res.on("data", (d) => {
        data += d;
      });
      res.on("end", () => {
        cb(data);
      });
    }
  );
}
