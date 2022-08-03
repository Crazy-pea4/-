let http = require("http");

/**
 *      跨域解决方式---jsonp
 *      - 原理：手动生成srcipt标签，利用其中的src不会产生跨域的特性
 *      - 操作：后端发送回来一个函数，前端提前准备好这个函数，在合适的时机调用即可
 */

http
  .createServer((req, res) => {
    let url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);
    let cb = url.searchParams.get("callback");
    res.end(
      `${cb}(${JSON.stringify({
        name: "myName",
        age: 19,
      })})`
    );
  })
  .listen(8080, () => {
    console.log("监听成功");
  });
