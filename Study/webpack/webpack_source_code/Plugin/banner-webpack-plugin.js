// BannerWebpackPlugin：给打包输出文件添加注释。

// 1. 获取将要输出的资源文件：compilation.assets
// 2. 过滤只保留js和css资源
// 3. 遍历剩下资源添加上注释
class BannerWebpackPlugin {
  constructor(title = "未知") {
    this.title = title;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "BannerWebpackPlugin",
      (compilation, callback) => {
        debugger;
        const extensions = ["js", "css"];
        const assets = Object.keys(compilation.assets).filter((asset) => {
          const extension = asset.split(".")[asset.split(".").length - 1];
          return extensions.includes(extension);
        });

        const prefix = `/*
* 作者：${this.title}
*/`;

        assets.forEach((asset) => {
          // 调用内置的source方法来获取原来的内容
          const source = compilation.assets[asset].source();
          const content = prefix + source;
          compilation.assets[asset] = {
            // 改写source方法，让其返回更新的内容
            source() {
              return content;
            },
            // 资源大小
            size() {
              return content.length;
            },
          };
        });
        callback();
      }
    );
  }
}

module.exports = BannerWebpackPlugin;
