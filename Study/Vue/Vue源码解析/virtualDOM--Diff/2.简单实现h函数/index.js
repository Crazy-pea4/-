import h from "./h";

let result = h("div", {}, [
  h("div", {}, "抽烟"),
  h("div", {}, "喝酒"),
  h("div", {}, h("div", {}, "烫头")),
]);
console.log(result);
