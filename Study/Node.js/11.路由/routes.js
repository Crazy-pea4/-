const fs = require("fs");
const path = require("path");
const mime = require("mime");
function parse(res, path, status, type = "") {
  res.writeHead(status, {
    "Content-Type": `${type ? type : "text/html"};charset=uft-8`,
  });
  res.write(fs.readFileSync(path, { encoding: "utf-8" }));
  res.end();
}

function isStaticFile(req, res) {
  const url = new URL(req.url, "http://localhost:8080");
  // __dirname是nodejs全局变量，获取到的是执行该命令所在的目录
  // 但是发现__dirname获取到的目录是有反斜杠\，直接拼接会乱。因此引入path模块
  let pathname = path.join(__dirname, "/static", url.pathname);
  // 判断获取到的路径是否存在
  if (fs.existsSync(pathname)) {
    parse(res, pathname, 200, mime.getType(pathname));
    return true;
  }
}
module.exports = {
  "/": (req, res) => {
    parse(res, "./static/home.html", 200);
  },
  "/login": (req, res) => {
    parse(res, "./static/login.html", 200);
  },
  "/home": (req, res) => {
    parse(res, "./static/home.html", 200);
  },
  "/404": (req, res) => {
    if (isStaticFile(req, res)) return;
    parse(res, "./static/404.html", 404);
  },
};
