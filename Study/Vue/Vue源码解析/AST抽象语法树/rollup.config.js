import { babel } from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const config = {
  input: "./src/index.js",
  output: {
    file: "./dist/ast.js",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules",
    }),
    serve({
      open: false,
      contentBase: "./dist",
      host: "localhost",
      port: 5050,
    }),
    livereload({
      watch: "dist",
    }),
  ],
};

export default config;
