const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
        <html>
            <h1>你好，express</h1>
            <h2>send方法可以解析</h2>
        </html>
    `);
});

// 中间件函数能够访问请求对象 (req)、响应对象 (res) 以及应用程序的请求/响应循环中的下一个中间件函数。
// 中间件函数可以存在多个，以实现逻辑功能
// 下一个中间件函数通常由名为 next 的变量来表示。

const fn1 = (req, res, next) => {
  // Do Something
  if (1) {
    // 调用next()把控制权交给下一个中间件函数
    next();
  } else {
    res.send("未查询到信息");
  }
};
const fn2 = (req, res) => {
  // Something is Done
  res.send("查询完毕，信息匹配");
};

app.get(
  "/home",
  // (req, res, next) => {
  //   // Do Something
  //   if (1) {
  //     // 调用next()把控制权交给下一个中间件函数
  //     next();
  //   } else {
  //     res.send("未查询到信息");
  //   }
  // },
  // (req, res) => {
  //   // Something is Done
  //   res.send("查询完毕，信息匹配");
  // }
  // 支持数组写法
  [fn1, fn2]
);

// 占位符
app.get("/home/:parmas", (req, res) => {
  res.send("占位符");
});

// 支持正则。以xxx结尾
app.get(/.*fly$/, (req, res) => {
  res.send("支持正则，以xxx结尾");
});

app.listen(8080, () => {
  console.log("服务器启动完毕，开始监听");
});
