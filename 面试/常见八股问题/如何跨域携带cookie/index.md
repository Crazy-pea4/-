要解决两个问题，第一个是跨域，第二个是携带 cookie

### 前端请求时设置`withCredentials`

**XMLHttpRequest.withCredentials** 属性是一个 Boolean 类型，它指示了是否该使用类似 cookies,authorization headers(头部授权)或者 TLS 客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site `Access-Control`）请求。在同一个站点下使用`withCredentials属性是无效的。`

如果在发送来自其他域的 XMLHttpRequest 请求之前，未设置`withCredentials`  为 true，那么就不能为它自己的域设置 cookie 值。而通过设置`withCredentials`  为 true 获得的第三方 cookies，将会依旧享受同源策略，因此不能被通过[document.cookie](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FDocument%2Fcookie "https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie")或者从头部相应请求的脚本等访问。

服务端在`response`的`header`中配置

`"Access-Control-Allow-Origin", "http://xxx:${port}"`

服务端在`response`的`header`中配置

`"Access-Control-Allow-Credentials", "true"`
