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
    httpsPost((data) => {
      res.end(data);
    });
  })
  .listen(8080, () => {
    console.log("监听成功");
  });

function httpsPost(cb) {
  let data = "";
  const options = {
    hostname: "www.xiaomiyoupin.com",
    path: "/mtop/mf/resource/data/list",
    method: "POST",
  };
  // https.request返回一个 http.ClientRequest对象，利用其中的write方法发送数据
  let req = https.request(options, (res) => {
    res.on("data", (d) => {
      data += d;
    });
    res.on("end", () => {
      cb(data);
    });
  });
  req.write(JSON.stringify([{}, "pc_top_list"]));
  // 使用了write后必须使用end来结束发送
  req.end();
}
