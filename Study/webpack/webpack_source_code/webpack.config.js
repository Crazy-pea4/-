const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./Plugin/test-plugin");
const BannerWebpackPlugin = require("./Plugin/banner-webpack-plugin");
const CleanWebpackPlugin = require("./Plugin/clean-webpack-plugin");
const AnalyzeWebpackPlugin = require("./Plugin/analyze-webpack-plugin");
const InlineChunkWebpackPlugin = require("./Plugin/inline-chunk-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    // clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "./myLoader/sayHello-loader/index.js",
      //   options: {
      //     words: "Hi",
      //   },
      // },
      // {
      // test: /\.js$/,
      // 测试异步loader（从右到左，从下到上）
      // use: ["./loader/pitchLoader1.js", "./loader/pitchLoader2.js"],
      // },
      {
        test: /\.js$/,
        loader: "./myLoader/babel-loader/index.js",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|)$/,
        loader: "./myLoader/file-loader/index.js",
        // 下面字段阻止webpack使用内置asset，防止重复处理资源
        type: "javascript/auto",
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: ["./myloader/style-loader/index.js", "css-loader"],
      },
    ],
  },
  plugins: [
    new TestPlugin(),
    new BannerWebpackPlugin("叶萌"),
    new CleanWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new InlineChunkWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  mode: "production",
};
