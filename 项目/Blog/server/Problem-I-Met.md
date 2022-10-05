## ts+nodejs

在搭建 nodejs 项目使用 ts，可以用 import 语句

## morgan.js 只输出报错信息

这是因为把路由中间件写在了 morgan 中间件之前，这样当正确访问时，不会走 morgan，只有错误时，才会从路由中间件往下找找到 morgan
事实上，应当把所有的功能性中间件卸载应用性中间件之前。

## 编写中间件时

写的中间件往往缺少类型注解，在网上找了半天没有具体解决，经过对代码的追索溯源找到源文件中的声明文件导出的接口，在中间件文件处引入即可。（个人感觉不是很优雅）

## 关于 Validate 中间件

它能做到的基本上也在 userModel 的 Schema 里面规定了，写它是为了再 routes 里面的文件简洁一点。但它有一个无法做到的地方，那就是查重，毕竟这是数据库的功能，它只是对进来的数据进行校验，至于数据在数据库中的表现它不关心也不能关心到。因此还需要再 routes 里面对 model 操作过后的值进行一个判断。（所以这里我就感觉这个 validate 就是整洁作用占比大）

## 密码加密与 Schema 的冲突

在 userModel 里，给进入模型的数据定了规范，其中密码是最短 6 个最长 16 个。而后在 userControll.register 中把数据加密后再去添加数据到数据库时控制台报错，原因是加密后的密码在进入数据库前不符合 Schema 的最长 16 个规范，考虑到先前使用了 validate 中间件来校验数据，因此可以把这里的 Schema 中的密码最长限制去掉，防止冲突。

## 使用jwt.sign发生的问题

起初在utils文件夹下封装了jwt，其中jwt.sign方法传入的第一个参数为string并没有报错。随后为了验证token的有效，写上了第三个参数{expiresIn: timeout}，重启项目发现控制台报错

```js
const Jwt: JWT = {
  sign: (value, timeout) => {
    return jwt.sign(value, config.secret, { expiresIn: timeout });
  },
  verify(token) {
    return jwt.verify(token, config.secret);
  },
};
```

```
Error: invalid expiresIn option for string payload
```

查阅资料得知：加上第三个选项后，第一个选项传进来的不能是string，于是改成一个对象

```js
const Jwt: JWT = {
  sign: (value, timeout) => {
    return jwt.sign({ value }, config.secret, { expiresIn: timeout });
  },
  verify(token) {
    return jwt.verify(token, config.secret);
  },
};
```
