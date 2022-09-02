/**
 * pitch 方法优先执行，在 loader 之前
 * pitchLoader 中暴露的 pitch 方法的执行顺序与 loader 执行顺序相反。详见文档
 * 如果在任何一个 pitch 链中有return xxx即返回数据，则webpack会跳过后面所有的的 pitch 和 loader，直接进入上一个loader
 */
module.exports = function (content) {
  console.log("loader1");
  return content;
};
// 使用pitchLoader需要额外暴露一个方法
module.exports.pitch = function () {
  console.log("pitch1");
};
