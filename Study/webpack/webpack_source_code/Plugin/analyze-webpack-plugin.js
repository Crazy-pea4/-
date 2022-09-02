/**
 * 1. 遍历所有即将输出的文件，得到其大小
 * 2. 生成一个md文件
 */
class AnalyzeWebpackPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
      const assetsArr = Object.entries(compilation.assets);
      /**
       * md中表格语法：
       * | 资源名称 | 资源大小 |
       * | --- | --- |
       * | xxx.js | 10kb |
       */
      let content = `| 资源名称 | 资源大小 |
| --- | --- |`;
      assetsArr.forEach(([filename, file]) => {
        content += `\n| ${filename} | ${file.size()}|`;
      });
      compilation.assets["analyzed.md"] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
