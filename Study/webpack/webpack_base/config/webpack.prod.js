// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length - 1;
// 引入一个path包，这是nodejs内置的帮忙拼接路径的包
const path = require("path");
// 引入esLint
const ESLintPlugin = require("eslint-webpack-plugin");
// 引入html自动打包插件（自动化引入css等文件）
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入提取css插件（解决js解析样式造成的闪屏问题）
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入css压缩插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 引入terser（内置的无需下载）
const TerserPlugin = require("terser-webpack-plugin");

// Webpack 是基于 Node.js 运行的，所以采用 Common.js 模块化规范
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径（不用改变，因为它是相对于运行代码的目录）
  // 输出
  output: {
    // 输出路径（所有文件）
    // __dirname是nodejs中的变量，代表当前文件的文件夹目录。输出至dist文件夹下
    path: path.resolve(__dirname, "../dist"), //绝对路径
    // filename是入口文件打包输出文件名，与其他文件无关
    filename: "js/main.js",
    clean: true, // 自动将path指定的文件夹清空后再打包
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        oneOf: [
          {
            test: /\.css$/, // 检测.css结尾的文件
            // use执行顺序是 从后往前
            use: [
              MiniCssExtractPlugin.loader, // 2.提取js文件中的css成单独文件
              "css-loader", // 1.将css资源编译成commonjs的模块到js中
              // postcss-loader解决css兼容性问题。
              // 为了验证，我们把less中添加display: flex，并且在package.json中添加"browserslist": ["ie >= 8"] 然后到输出文件下看看
              // 可以通过在webpack配置文件中以对象形式、也可以像下面一下在外面使用postCSS本身的配置文件
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: [["postcss-preset-env"]],
                  },
                },
              },
            ],
          },
          {
            test: /\.less$/,
            // loader: 'xxx' // 只能使用一个loader
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /\.s[ac]ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.styl$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "stylus-loader",
            ],
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
            use: [
              {
                loader: "thread-loader",
                options: {
                  workers: threads,
                },
              },
              {
                loader: "babel-loader",
                // 可以写在这里，也可以写在根目录里面的babel.config.js中
                options: {
                  // presets: ["@babel/preset-env"],
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭缓存文件压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
              },
            ],
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // context指检测哪儿的文件
      context: path.resolve(__dirname, "../src"),
      cache: true, // 开启eslint缓存
      cacheLocation: path.join(__dirname, "../node_modules/.cache/eslint"),
    }),
    // 生成实例。打包出来的路径是path配置的dist文件夹下
    new HtmlWebpackPlugin({
      // template 指定以什么html为模板，在其基础上自动引入打包资源。也就是说原来的DOM结构仍然保留
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
    // css压缩
    new CssMinimizerPlugin(),
    new TerserPlugin({
      parallel: threads,
    }),
  ],
  // 模式
  mode: "production",
  // devtool
  devtool: "source-map",
};
