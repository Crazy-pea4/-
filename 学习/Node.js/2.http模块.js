// 引入http模块
const http = require('http');
// 创建服务器实例对象
const server = http.createServer();
// 绑定事件 .on('事件名', 事件回调函数)
server.on('request', (req, res) => {
    // 在浏览器地址栏输入localhost或者127.0.0.1
    console.log('someone has arrived');
    console.log(req, res);
    // req请求对象：有基本的url和method
    // res相应对象：调用res.end()方法向请求的客户端发送数据并且结束此次请求
    // 如果需要传递中文，则需要设置一下响应头 res.setHeader('Content-Type', 'text/html; charset=utf-8')
})
// 启动服务器 .listen('端口号', 回调函数)
server.listen('80', () => {
    console.log('server is being watching');
})