module.exports = function (content) {
  console.log("loader2");
  return content;
};
// 使用pitchLoader需要额外暴露一个方法
module.exports.pitch = function () {
  console.log("pitch2");
  return "111";
};
