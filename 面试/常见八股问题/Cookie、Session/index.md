## cookie 和 session

cookie 和 session 一般结合起来用，放在客户端的是 cookie，放在服务端的是 session。

它们之间连接的桥梁是 sessionId。在服务端收到请求后，使用 set-cookie 将 sessionId 放入响应头 cookie 字段中，同时可以设置 Max-Age 等

### 总过程

发送登陆请求

创建一个 session，并将 session 的唯一标识 sessionId，设置在 Set-Cookie 响应头中，响应给客户端

发送其他请求并自动携带 Cookie，服务端通过 sessionId 找到 session，没找到则重新创建 session

Cookie 验证通过，正常响应请求
