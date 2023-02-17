# CORS

1. 响应头配置 Access-Control-Allow-Origin 字段
2. 当用户试图修改服务端数据时，浏览器会发送一个预检请求，此时 Method 是 OPTION，来查看响应头中的 Access-Control-Allow-Methods 是否包含该方法
