// 引入express框架
const express = require('express');
// 创建应用对象
const app = express();

// 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (request, response) => {
    // 设置响应
    response.send('你好，Ajax')
})

// 监听端口启动服务
app.listen(8000, () => {
    console.log('服务器启动成功');
})
