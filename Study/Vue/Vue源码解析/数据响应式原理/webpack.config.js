const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: undefined,
  },
  devServer: {
    host: "localhost",
    port: 8080,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  devtool: "inline-source-map",
  mode: "development",
};
