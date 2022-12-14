## 前端路由

### hash模式

    根据hash值的不同，可以渲染不同组件。通过window.addeventListener('popstate')监控到hash值的变化（兼顾老版本ie浏览器就是hashchange）

    缺点：

1. 路径都带#号，不美观

2. 服务端接收不到#号及其后的内容，无法实现seo优化

### history模式

    路径内容可以被服务端获取，这意味着如果服务端没有对应路径就会找不到资源。需要服务端配合，更好的seo优化
