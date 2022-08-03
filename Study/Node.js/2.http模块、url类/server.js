let http = require("http");

// 创建服务器
let server = http.createServer();
server.on("request", (req, res) => {
  // req 接受浏览器传的参数 res 返回渲染内容
  if (req.url === "/favicon.ico") {
    // Todo
    return;
  }
  // 处理url时，可以使用nodejs内部提供的URL构造函数。new URL(input, [base])
  const url = new URL(req.url, "http://127.0.0.1:8080");
  console.log(url);
  // 处理传参时

  for (const [key, value] of url.searchParams) {
    console.log(key, value);
  }
  let currentPage;

  // 这里可以不设置响应头也会自动解析html标签，但手动设置响应头比较保险
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.write(
    `<html>
            <h1>Hello World</h1>
            <h1>如果中文不设置响应头charset=utf-8的话就会乱码</h1>
        </html>` + `现在是${currentPage}页面`
  );
  res.end();
});
server.listen(8080, () => {
  console.log("服务器启动，开启监听");
});
