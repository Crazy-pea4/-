const http = require("http");
const fs = require("fs");
const gzip = require("zlib").createGzip();

http
  .createServer((req, res) => {
    // 还需要设置一下响应头，不然浏览器默认会下载压缩文件
    res.writeHead(200, {
      "Content-Type": "application/json",
      // 还需要在响应头添加上Content-Endcoding: gizp
      "Content-Encoding": "gzip",
    });
    fs.createReadStream("./data.txt").pipe(gzip).pipe(res);
  })
  .listen(8080, () => {
    console.log("服务器开启，开始监听");
  });

/**
 *    对比可以发现：
 *        没有压缩时体积大小：155KB
 *        压缩后体积大小：37.5KB
 */
