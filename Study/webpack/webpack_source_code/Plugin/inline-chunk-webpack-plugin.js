const HtmlWebpackPlugin = require("html-webpack-plugin");

class InlineChunkWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("MyPlugin", (compilation) => {
      // 1. 获取HtmlWebpackPlugin的hooks
      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tap("InlineChunkWebpackPlugin", (assets) => {
        debugger;
        assets.headTags = this.getInlineChunk(
          assets.headTags,
          compilation.assets
        );
        assets.bodyTags = this.getInlineChunk(
          assets.bodyTags,
          compilation.assets
        );
      });
    });
  }

  getInlineChunk(tag, assets) {
    return tag.map((tag) => {
      if (tag.tagName !== "script") return tag;
      else {
        const filePath = tag.attributes.src;
        if (!filePath) return tag;
        // 检测runtime.xxx.js文件
        else if (/runtime(.*)\.js/g.test(filePath)) {
          return {
            tagName: "script",
            innerHTML: assets[filePath].source(),
            closeTag: true,
          };
        } else return tag;
      }
    });
  }
}

module.exports = InlineChunkWebpackPlugin;
