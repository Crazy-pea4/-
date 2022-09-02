/**
 * CleanWebpackPlugin：将上一次打包的文件清空
 */
class CleanWebpackPlugin {
  constructor() {}
  apply(compiler) {
    const outputPath = compiler.options.output.path;
    const fs = compiler.outputFileSystem;
    compiler.hooks.emit.tap("CleanWebpackPlugin", (compilation) => {
      this.rmdir(fs, outputPath);
    });
  }
  rmdir(fs, outputPath) {
    fs.rmdirSync(outputPath, { recursive: true });
  }
}

module.exports = CleanWebpackPlugin;
