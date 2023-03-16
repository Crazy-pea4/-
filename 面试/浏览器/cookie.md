## 什么是 Cookie

1. cookie 存储在客户端： cookie 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

2. cookie 是不可跨域的： 每个 cookie 都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间是允许共享使用的（靠的是 domain）。

## 什么是 Session

session 是另一种记录服务器和客户端会话状态的机制

session 是基于 cookie 实现的，session 存储在服务器端，sessionId 会被存储到客户端的 cookie 中

<img title="" src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL3N6X21tYml6L0hWNHlUSTZQamJLcURpYUJlZnpIRng4S0lIRHJ2YmtIMEQwT2licmpQWlRLOUFKclphRG9UYkdpYWliaWJndVplNGg4WGx2OU1Rc1lTM0Y2Y2FnY0xwN05PN3cvNjQw?x-oss-process=image/format,png" alt="" width="585" data-align="center">

## Cookie 和 Session 的区别

- **安全性：** Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。

- **存取值的类型不同**：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。

- **有效期不同：** Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。

- **存储大小不同：** 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。

## 什么是 Token（令牌）

简单 token 的组成： uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

## 什么是 JWT

- JSON Web Token（简称 JWT）是目前最流行的**跨域认证**解决方案。

- 是一种**认证授权机制**。

**JWT 认证流程：**

    用户输入用户名/密码登录，服务端认证成功后，会返回给客户端一个 JWT

    客户端将 token 保存到本地（通常使用 localstorage，也可以使用 cookie）

    当用户希望访问一个受保护的路由或者资源的时候，需要请求头的 Authorization 字段中使用Bearer 模式添加 JWT

## Token 和 JWT 的区别

**相同：**

- 都是访问资源的令牌

- 都可以记录用户的信息

- 都是使服务端无状态化

- 都是只有验证成功后，客户端才能访问服务端上受保护的资源

**区别：**

- Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。

- JWT：将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。
