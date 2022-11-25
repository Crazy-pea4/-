## 1. dns解析

浏览器缓存——缓存的时间也是有限制的，一般几分钟到几小时

系统缓存——通过查找本机的host文件

本地 DNS 服务器

ISP(网络运营商) DNS缓存——本地DNS询问ISP DNS缓存

根服务器——ISP会代替用户向根服务器发起查询请求。例如查找.com是由哪个顶级域名服务器负责的，然后返回该IP给本地DNS

顶级域名服务器——本地DNS得到根服务器返回的IP后，若可以解析则返回文件，若无法解析则找到并返回管理.com域的二级域名服务器IP给本地DNS

二级域名服务器——查看区域文件记录，有则返回文件，若还是无法完成解析，则域名可能存在错误

## 2. 建立TCP连接

三次握手——详情\*

## 3. 发送HTTP/HTTPS请求

3.1 请求报文：

<img title="" src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC8yLzEvMTZmZmU3NjA2YzhkYjVlNw?x-oss-process=image/format,png" alt="" width="818">

请求头和请求体之间还有一个空行，代表请求头的结束

3.2 响应报文：

<img title="" src="https://img-blog.csdnimg.cn/fcc17e855ba64039821803329489a55d.png" alt="总体网络架构" width="759">

同样的，响应头和响应体之间还有一个空行，代表响应头的结束

## 4. 浏览器解析并渲染页面

浏览器检查相应状态码-数据缓存（若需要）-进行相应的解码（例如gzip）-根据资源类型决定如何处理




