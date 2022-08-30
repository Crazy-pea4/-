// rawLoader接收到的文件内容content是Buffer数据
// 专门用来处理图片、字体图标等二进制流
module.exports = function (content) {
  console.log(content);
  return content;
};
// 使用rawLoader需要额外暴露一个属性
module.exports.raw = true;
