// 引入一个path包，这是nodejs内置的帮忙拼接路径的包
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// webpack所有的配置信息都要写在module.exports中
module.exports = {
  target: "web",
  // 入口
  entry: "./src/index.ts",
  // 输出
  output: {
    // 输出路径
    path: path.resolve(__dirname, "dist"),
    // 打包后文件名
    filename: "js/bundle.js",
    clean: true,
  },
  // 指定webpack打包时要使用的模块
  module: {
    // 指定加载规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        use: "ts-loader",
        // 排除不处理的文件
        exclude: "/node_modules",
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
    }),
  ],
  // 配置resolve解析选项，来扩展需要解析的后缀名。重写extensions会覆盖原有配置，使用'...'来访问默认扩展名
  resolve: {
    extensions: [".ts", "..."],
  },
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    static: {
      directory: path.resolve(__dirname, "./dist/index.html"),
    },
    watchFiles: 'src/index.html',
  },
};
