// ------require()方法
// 1.使用require()加载内置模块、用户自定义模块、第三方模块
// 注意，使用require()加载模块时，会执行被加载模块中的代码

// ------module对象
// 在node.js中，有模块作用域的概念，也就是a.js在b.js被require()加载了，a.js里面的对象或方法是不能在b.js中引用的
// 在每一个.js自定义模块中都有一个module对象，它里面存储了和当前模块有关的信息
// 使用node打开本文件，查看控制台
console.log(module);
// 我们可以使用module.exports将模块内的成员共享出去，外界使用require()方法导入自定义模块时，得到的就是module.exports所指向的对象

// ------exports对象
// 为了简化，默认情况下，exports和module.exports指向的是同一个对象
console.log(module.exports === exports);

// 对于exports对象和module.exports的使用误区详解，请看https://www.bilibili.com/video/BV1a34y167AZ?p=24
