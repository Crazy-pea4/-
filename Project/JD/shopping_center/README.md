## 该项目在高版本下的 Node 环境中有旧 hash 不支持的报错

此时，你应该将一下代码添加到 package.json 中
对于 windows 用户
`"serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve"`
对于 mac 用户
`"serve": "export NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve"`

重新启动项目即可在本地运行
