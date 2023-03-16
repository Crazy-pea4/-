# 点击劫持（ClickJacking）

点击劫持（Clickjacking）是一种通过**视觉欺骗**的手段来达到攻击目的手段。往往是攻击者将目标网站通过 iframe 嵌入到自己的网页中，通过 opacity z-index 等手段设置 iframe 为顶层透明的，使得肉眼不可见，这样一来当用户在攻击者的网站中操作的时候，比如点击某个按钮（这个按钮的顶层其实是 iframe），从而实现目标网站被点击劫持。

### 预防方案

服务端设置 `X-Frame-Options`响应头，拒绝页面被嵌套。X-Frame-Options 是 HTTP 响应头中用来告诉浏览器一个页面是否可以嵌入 \<iframe> 中

X-Frame-Options 有两个可能的值：

- SAMEORIGIN: iframe 页面的地址只能为同源域名下的页面

- DENY: 当前页面不能被嵌套在 iframe 里
