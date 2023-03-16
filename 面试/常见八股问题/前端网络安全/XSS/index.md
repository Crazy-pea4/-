# Xss

Cross-Site Scripting（跨站脚本攻击）简称 XSS，是一种代码注入攻击。攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行。利用这些恶意脚本，攻击者可获取用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全。

_为了和 CSS 区分，这里把攻击的第一个字母改成了 X，于是叫做 XSS。_

### Xss 的三种方式

- 反射型

- 储存型

- Dom 型

#### 反射型

反射型通常出现于以下场景：常见于通过  `URL`  传递参数的功能，如网站搜索、跳转等

`?key=123`

如果该网站是后端渲染的，那么会把下面的 key 替换掉

`<div>% key %<div>` ==> `<div>123</div>`

但如果被写成`?key=<script>document.cookie ...</script>`

那么后端也会渲染返回给前端，这时用户访问该网站就会造成 cookie 的泄露

#### 储存型

与反射型类似，通过表单元素向服务端传输恶意代码。像在`input`标签写入脚本，服务端会在后端渲染或存入数据库，往后再次访问该网站就会执行该脚本。如果前端使用`document.innerHTML`也会把数据库的恶意代码执行。

#### Dom 型

与前两者不同，它不需要经过前后端交互，即为前端代码的缺陷，其实也就是前端过于相信用户内容，直接渲染

---

## XSS 防范措施

由上面对 XSS 攻击的介绍我们知道，XSS 攻击主要有两大步骤：

- 攻击者提交恶意代码
- 浏览器执行恶意代码

##### 输入过滤

第一层防范是前端输入过滤，不过攻击者可能直接对服务端伪造请求，所以在服务端也要过滤输入的数据

##### 设置 HttpOnly Cookie

一般 XSS 攻击是为了获取用户的权限信息，所以服务端在设置 cookie 时可以设置 HttpOnly

`response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly")`

##### CSP（内容安全策略）

CSP 本质上就是建立白名单，由浏览器进行拦截。开发者明确告诉浏览器哪些外部资源可以加载和执⾏。

服务端：配置  `Content-Security-Policy: policy` 响应头

前端：可以通过\<meta>标签

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
```

##### 慎用 InnerHTML
