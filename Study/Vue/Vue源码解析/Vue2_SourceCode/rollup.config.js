// rollup默认可以导出一个对象，作为打包的配置文件
import babel from "rollup-plugin-babel";
export default {
  input: "./src/index.js", // 入口文件
  output: {
    file: "./dist/vue,js", // 输出的文件名
    name: "Vue", // 在全局中添加一个Vue实例，以后可以执行new Vue(),
    format: "umd", // https://www.rollupjs.com/guide/big-list-of-options
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules",
    }),
  ],
};
