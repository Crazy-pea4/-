const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    // 输出路径（所有文件）
    path: undefined, // 开发模式没有输出，path可为undefined
    // filename是入口文件打包输出文件名，与其他文件无关
    filename: "./bundle.js",
  },
  devServer: {
    host: "localhost",
    // 不压缩
    compress: false,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
  mode: "development",
};
