const express = require("express");
const app = express();

/**
 * 应用层中间件
 * - 给往后的app注册一个回调函数，访问路径前都会经过一次
 * - 可以给
 * app.use(path?: string, ...handers: function)
 * */
const fn1 = (req, res, next) => {
  // Do Something
  if (1) {
    // 调用next()把控制权交给下一个中间件函数
    next();
  } else {
    res.send("未查询到信息");
  }
};
app.use(fn1);
/**
 * 应用层中间件
 *
 *  */

const fn2 = (req, res) => {
  // Something is Done
  res.send("查询完毕，信息匹配");
};

app.get("/", (req, res) => {
  res.send(`
        <html>
            <h1>你好，express</h1>
            <h2>send方法可以解析</h2>
        </html>
    `);
});

app.get(
  "/home",
  // 支持数组写法
  [fn1, fn2]
);

app.listen(8080, () => {
  console.log("服务器启动完毕，开始监听");
});
