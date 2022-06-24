// 引入一个path包，这是nodejs内置的帮忙拼接路径的包
const path = require("path");

// webpack所有的配置信息都要写在module.exports中
module.exports = {
  // 入口
  entry: "./src/index.js",
  // 输出
  output: {
    // 输出路径
    path: path.resolve(__dirname, "dist"),
    // 打包后文件名
    filename: "bundle.js",
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定加载规则
    rules: [
        {
            // test指定的是规则生效的文件
            test: /\.ts$/,
            use: 'ts-loader'
        }
    ]
  },
};
