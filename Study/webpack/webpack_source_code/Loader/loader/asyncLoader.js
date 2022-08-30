module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    console.log("asyncLoader");
    callback(null, content, map, meta);
  }, 2000);
};
