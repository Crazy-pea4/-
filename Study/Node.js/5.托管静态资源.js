const express = require('express');
const app = express();

// 托管静态资源 express.static()
app.use(express.static('./public'))
// static方法需要传递一个文件夹路径，用于将该文件夹下的资源对外开放，而/public这一路径并不会出现在URL中

// 但如果你需要挂载一个路径前缀
app.use('/public', express.static('./public'))

app.listen(80, () => {
    console.log('Server is running at http://localhost:80, waiting for options...');
})