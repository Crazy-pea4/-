// 引入一个path包，这是nodejs内置的帮忙拼接路径的包
const path = require("path");
// 引入esLint
const ESLintPlugin = require("eslint-webpack-plugin");
// 引入html自动打包插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径（不用改变，因为它是相对于运行代码的目录）
  // 输出
  output: {
    // 输出路径（所有文件）
    path: undefined, // 开发模式没有输出，path可为undefined
    // filename是入口文件打包输出文件名，与其他文件无关
    filename: "js/main.js",
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
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
      // 处理图片资源
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset",
        parser: {
          // 设置小于10kb的通过test断言测试的图片转base64
          dataUrlCondition: {
            maxSize: 10 * 1024, // 单位kb
          },
        },
        // 将通过test的文件打包到static。其中hash是文件的哈希值；ext是文件后缀；query是传递的参数
        generator: {
          // [hash:10] 代表只取前十位哈希值
          filename: "static/[hash:10][ext][query]",
        },
      },
      // babel-loader
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/, // 排除node_modules、bower_components文件夹
        use: {
          loader: "babel-loader",
          // 可以写在这里，也可以写在根目录里面的babel.config.js中
          // options: {
          //   presets: ["@babel/preset-env"],
          // },
        },
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // context指检测哪儿的文件
      context: path.resolve(__dirname, "../src"),
    }),
    // 生成实例。打包出来的路径是path配置的dist文件夹下
    new HtmlWebpackPlugin({
      // template 指定以什么html为模板，在其基础上自动引入打包资源。也就是说原来的DOM结构仍然保留
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器：不会输出资源，其在内存中编译打包 （在v4以后HMR会自动打开）。
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式
  mode: "development",
};
