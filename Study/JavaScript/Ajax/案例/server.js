// 引入express框架
const express = require('express');
// 创建应用对象
const app = express();

// 创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
// 在浏览器网址上输入localhost:8000/server，注意要加上/server
app.get('/server', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    response.send('hello，Ajax ');
})
app.post('/server', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    response.send('hello，Ajax POST');
})
app.all('/json-server', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 响应一个数据
    const data = {
        name: 'yemeng'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应
    response.send(str);
})

// 专门针对 IE 缓存
app.get('/ie', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    response.send('goodBye，IE-111');
})

// 延时响应
app.get('/delay', (request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应
    setTimeout(() => {
        response.send('延时响应');
    }, 3000)
});
// 监听端口启动服务
app.listen(8000, () => {
    console.log('服务器启动成功');
})