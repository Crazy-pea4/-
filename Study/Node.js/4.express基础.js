// 引入express模块
const express = require('express');
// 创建express实例
const app = express();
// 启动服务器
app.listen(80, () => {
    console.log('Server is running at http://localhost:80, waiting for options...');
})

// 监听 GET请求
app.get('请求URL', (req, res) => {
    // 向客户端发送JSON对象
    res.send({ name: '王维', age: 2000, gender: 'male' });
    // 获取URL中的params（动态）参数    注意：获取params时，需要在URL处填写对应的占位符，例 'user/:id'表示的是获取名为id的params参数
})
// 监听POST请求
app.post('请求URL', (req, res) => {
    // 发送一段文本
    res.send('请求成功')
    // 获取URL中的query（查询）参数
    console.log(req.query);
})

