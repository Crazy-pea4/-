// 该文件命名是固定的（以官方为主）

const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * 当检测到向自身服务器/api路径请求时，会走target指定的网站去请求
 *      例如：当向 http://localhost:3000/api/aaa/bbb 发送请求时，检测到 /api 路径
 *      会自动走 http://www.baidu.com/api/aaa/bbb
 */

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://www.baidu.com",
      changeOrigin: true,
    })
  );
};
