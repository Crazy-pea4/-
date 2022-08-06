const fs = require("fs");

function parse(res, path, status) {
  res.writeHead(status, { "Content-Type": "text/html;charset=uft-8" });
  res.write(fs.readFileSync(path, { encoding: "utf-8" }));
  res.end();
}

module.exports = {
  "/login": (req, res) => {
    parse(res, "./static/login.html", 200);
  },
  "/home": (req, res) => {
    parse(res, "./static/home.html", 200);
  },
  "/404": (req, res) => {
    parse(res, "./static/404.html", 404);
  },
};
