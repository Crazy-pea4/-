const schema = require("./schema.json");

module.exports = function (content) {
  // schema验证规则。要求符合JSON Schema规则
  const options = this.getOptions(schema);
  return content + `console.log("${options.words}, my first loader");`;
};
