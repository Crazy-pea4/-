// 引入一个path包，这是nodejs内置的帮忙拼接路径的包
const path = require("path");

// Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
module.exports = {
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    // 输出路径
    // __dirname是nodejs中的变量，代表当前文件的文件夹目录。输出至dist文件夹下
    path: path.resolve(__dirname, "dist"), //绝对路径
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/, // 检测.css结尾的文件
        // use执行顺序是 从后往前
        use: [
          "style-loader", // 2.将js中的css通过创建style标签添加到html文件中，使其样式生效
          "css-loader", // 1.将css资源编译成commonjs的模块到js中
        ],
      },
      {
        test: /\.less$/,
        // loader: 'xxx' // 只能使用一个loader
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
