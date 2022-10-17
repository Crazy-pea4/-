## ts+nodejs

在搭建 nodejs 项目使用 ts，可以用 import 语句

## morgan.js 只输出报错信息

这是因为把路由中间件写在了 morgan 中间件之前，这样当正确访问时，不会走 morgan，只有错误时，才会从路由中间件往下找找到 morgan
事实上，应当把所有的功能性中间件写在应用性中间件之前。

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

## 优化编辑用户editUser接口

将原来的****

```js
router.put(

  "/:id",

  authenticate,

  validate(userRegisterValidator),

  userController.editUser

);
```

改写为

```js
router.patch("/:id", authenticate, userController.editUser);
```

可以看到这里不使用validate中间件来校验传输字段，因为patch的数据可能会没有userRegisterValidator里要求的必选字段，会造成冲突。索性将这里的校验交给前端完成

## 在编写checkExisted的questioner时遇到的ObjectId转换问题

在设计question模块时，对于question的编辑和删除只能是creator操作，其他人无法操作，这就涉及到对questionModel中questioner的ObjectId（ref: "User"）比对当前token是否位同一个用户。

```ts
if(question?.questioner?.valueOf() !== value) {}
```

因为在mongoDB中的\_id默认为ObjectId类型，而headers中的token为string类型，无论如何不等式都成立。此时就需要对\_id进行类型转换

```ts
_id: new ObjectId("63481c1a9a405216649967a8")
```

一开始查阅资料是使用ObjectId().toString()，但是是在js中，而在ts中则会报错：

```ts
question?.questioner?.toString()

// (property) toString: {} | undefined
// Returns a string representation of an object.
// 此表达式不可调用。
//   类型 "{}" 没有调用签名。
```

后来查阅源码发现mongoose对于toString进行改写，使其成为一个属性，直接调用则会报错。

再后来发现在js中各类型的原型链上存在一个valueOf方法，可以取到通过new创建构造函数时传入的值

```ts
if (question?.questioner?.valueOf() !== value) ()
```

完美解决！

## 关于“问题”和“话题”之间的互相引用关系，及其数据结构设计

在Blog中，“问题”的数量是庞大的，而“话题”的数量可被视为有限的（相较于“问题数量而言”），因此将“话题”设置在“问题”模型中比反之更加高效。

在“问题”模型中新增一个字段用于存储topics，这样无论是请求“话题”的“问题”列表还是“问题”的“话题”列表比都比将questions设置在”话题“模型中快

## “回答”模块的路由设计

因为先有“问题”才有“回答”，所以把“回答”模块设计为“问题“的二级路由，也就是形如：

```ts
import question from "./question"
import answer from "./answer"

// 问题api
router.use("/question", question)

// 回答api
router.use("/question/:questionId/answer", answer)
```

但随后在answer模块中尝试通过req.parmas.questionId获取问题id是失效的，为undefined。（可能的原因为import语句的执行顺序导致）

意识到只能将/:questionId/answer写在answer模块内部的路由中才能通过req.parmas访问到。（在原来路径下最前面加上/:questionId/answer即可）

## 关于VsCode调试TS+NodeJs

调试Nodejs项目总是用console.log()的方式打印太low，而且终端输出的文本不能折叠展开，简直是好心情的杀手。

经过查阅网上的资料后，决定使用ts-node来debug

1. 打开”运行和调试“，点击右上角的齿轮，打开launch.json（本质上时创建 项目根目录/.vscode/launch.json）。

2. ```json
   {
     // 使用 IntelliSense 了解相关属性。
     // 悬停以查看现有属性的描述。
     // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "launch",
         "name": "调试NodeTS代码",
         // ts-node 命令： “直接”运行ts代码。
         // 作用：调试时加载ts-node包（在调试时“直接”运行ts代码）
         "runtimeArgs": [
           "-r",
           "${workspaceRoot}/项目/Blog/server/node_modules/ts-node/register"
         ],
         // 此处的 app.ts 表示要调试的 TS 文件（ 可修改为其他要调试的ts文件 ）
         "args": ["${workspaceFolder}/项目/Blog/server/app.ts"]
       }
     ]
   }
   ```

3. Tips：
   
   1. 需要再次下载typescript和ts-node到本项目下，因为无法定向到全局的包（其实这也好理解，本身项目放到服务器上就是需要其中已经下载好的包）
   
   2. 通常，\${workspaceRoot}就是当前项目的目录，在runtimeArgs和args里面的路径只要定位到app.ts和node_modules/ts-node/register即可
