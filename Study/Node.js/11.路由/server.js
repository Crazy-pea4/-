const http = require("http");
const routes = {};

function useRoute(obj) {
  Object.assign(routes, obj);
}

function startServer() {
  http
    .createServer((req, res) => {
      const myUrl = new URL(req.url, "http://localhost");
      // console.log(myUrl);
      try {
        routes[myUrl.pathname](req, res);
      } catch (err) {
        routes["/404"](req, res);
      }
    })
    .listen(8080, () => {
      console.log("服务器启动，开始监听");
    });
}

module.exports = {
  startServer,
  useRoute,
};
