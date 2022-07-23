const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: undefined,
    filename: "bundle.js",
  },
  devServer: {
    host: "localhost",
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
    compress: true,
  },
  mode: "development",
};
