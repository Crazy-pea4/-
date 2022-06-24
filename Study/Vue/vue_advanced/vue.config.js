module.exports = {
    // 代理服务器
    devServer: {
        // 方法一
        //   proxy: 'http://localhost:xxxx'
        // 上面的xxxx代表想要被获取数据的服务器，例如我8080想要5000的数据，那xxxx应该写上5000
        // ---------------------------------------------------------------
        // 方法二
        proxy: {
            // 请求前缀，代理服务器检测到传过来请求前缀与下面相同，就走下面配置的路径
            '/api': {
                target: 'http://localhost:xxxx',
                ws: true, // 用于支持websocket
                changeOrigin: true, // 值为true，服务器请求头中的host中端口为目标服务器；值为false，服务器请求头中的host中端口为请求服务器
                // 还需要一个pathRewrite配置项，它是一个对象
                pathRewrite: {
                    '^/api': '' // 其中key是一个正则表达式，值为路径。上面的写法表示找到以'/api'开头的字段，并且把'/api'变成''空字符串
                }
            },
            '/foo': {
                target: '<other_url>'
            }
        }

    }
}