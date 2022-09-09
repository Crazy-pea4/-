const http = require("http");

http
  .createServer((req, res) => {
    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      console.log(JSON.parse(data));
    });
    debugger;
    res.end("11");
  })
  .listen(80, () => {
    console.log("服务器打开，端口80");
  });
