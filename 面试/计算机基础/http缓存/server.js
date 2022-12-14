const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    console.log(url.parse(req.url).pathname);
    const { pathname } = url.parse(req.url);
    if (pathname === "/") {
      fs.readFile("./index.html", (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    } else if (pathname === "/images/spongebob.jpg") {
      fs.readFile(`.${pathname}`, (err, data) => {
        if (err) throw err;
        // expires响应头字段
        res.writeHead(200, {
          // 需要转换成UTC格式
          //   Expires: new Date("2022-12-11 00:20:20").toUTCString(),
          "cache-control": "max-age=10",
        });
        res.end(data);
      });
    } else if (pathname === "/images/mycat.jpg") {
      // 当文件修改了，就不使用缓存，没有修改就走缓存
      const state = fs.statSync(`.${pathname}`);

      const ifModifiedSince = req.headers["if-modified-since"];
      if (ifModifiedSince === state.mtime.toUTCString()) {
        // 若一致则缓存生效
        res.writeHead(304);
        res.end();
        return;
      }

      fs.readFile(`.${pathname}`, (err, data) => {
        if (err) throw err;
        res.writeHead(200, {
          "cache-control": "no-cache",
          // 在配置了last-modified"响应头字段后，客户端接收到了就会在下一次请求时给请求头加上If-Modified-Since字段
          "last-modified": state.mtime.toUTCString(),
        });
        res.end(data);
      });
    } else {
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("服务器启动成功，端口号3000 http://localhost:3000");
  });
