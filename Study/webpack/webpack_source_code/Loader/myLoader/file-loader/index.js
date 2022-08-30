const { interpolateName } = require("loader-utils");

module.exports = function (content) {
  /**
   * 1. 根据文件内容生成带hash值的文件名
   * 2. 将文件输出出去
   * 3. 返回module.exports = "文件路径（文件名）"
   */
  // 获取hash文件名（在前面加上images指定输出的文件夹名称）。使用assetModuleFilename和generator均无效，因为这两个前提是type: asset|asset/resource
  const filename =
    "images/" + interpolateName(this, "[hash].[ext][query]", { content });
  // console.log(filename);
  // 输出文件
  this.emitFile(filename, content);
  // 返回文件路径
  return `module.exports = "${filename}"`;
};

// 处理图片等文件都是用buffer流
module.exports.raw = true;
