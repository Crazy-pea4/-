# CSRF

CSRF(Cross Site Request Forgery)，即跨站请求伪造，是⼀种常⻅的 Web 攻击，它利⽤⽤户已登录的身份，在⽤户毫不知情的情况下，以⽤户的名义完成⾮法操作

场景：

- 受害者登录 A 网站，并且保留了登录凭证（Cookie）
- 攻击者引诱受害者访问 B 网站
- B 网站向 A 网站发送了一个请求，浏览器请求头中会默认携带 A 网站的 Cookie
- A 网站服务器收到请求后，经过验证发现用户是登录了的，所以会处理请求

几种攻击类型：

1. 使用`<img />`标签 GET 请求
   
   `<img src="http://bank.example/withdraw?amount=10000&for=hacker" >`
   在受害者访问含有这个 img 的页面后，浏览器会自动向http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker发出一次HTTP请求。bank.example就会收到包含受害者登录信息的一次跨域请求。

2. 使用`<form></from>`标签 POST 请求
   这种类型的 CSRF 利用起来通常使用的是一个自动提交的表单，如：

```html
<form action="http://bank.example/withdraw" method="POST">
  <input type="hidden" name="account" value="xiaoming" />
  <input type="hidden" name="amount" value="10000" />
  <input type="hidden" name="for" value="hacker" />
</form>
<script>
  document.forms[0].submit();
</script>
```

3. 链接类型的 CSRF 诱骗用户点击

`<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！</a>`

## CSRF 防范措施

#### 配置`Access-Control-Allow-Origin`

    在响应头配置`Access-Control-Allow-Origin`，非法域名将受到同源策略的限制

#### 同源检测

    服务端检查请求报文头部的 Origin Referer 可以得到请求源的url

#### 使用 Token

    服务端使用 Token 校验。第三方网站的伪造请求无法获取到客户端的token
