// module.exports = function (content) {
//   return content;
// };

module.exports = function (content, map, meta) {
  /**
   * 第一个参数：errMessage
   * 第二个参数：文件内容
   * 第三个参数：source-map
   * 第四个参数：给其他loader传递的参数
   */
  console.log("syncLoader");
  this.callback(null, content, map, meta);
};
