/**
 * loader是一个函数
 * 接受三个参数，分别是：
 * - content: 文件内容
 * - map: SourceMap
 * - meta: 其他loader传递的数据
 */

module.exports = function (content) {
  console.log(content);
  return content;
};
