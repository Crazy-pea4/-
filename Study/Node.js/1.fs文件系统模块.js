// 引入fs模块
const fs = require("fs");
// 读取语法格式
fs.readFile(path, [, options], function (err, data) {});
// path：必选，表示文件路径
// options：可选，表示以什么编码格式读取文件（默认 utf8）
// callback：必选，文件读取后，调用回调函数获取、处理结果
// 读取成功，则err的值为null，读取失败，则err为一个错误对象
// 写入语法格式
fs.writeFile(path, data, [, options], function (err) {})