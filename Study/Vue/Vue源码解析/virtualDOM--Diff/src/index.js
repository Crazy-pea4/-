import h from "./h";
import patch from "./patch";

const container = document.getElementById("container1");
const btn = document.getElementById("btn");

// const VNode = h("section", {}, "hello, VNode!");

const VNode = h("section", {}, [
  h("h3", { key: "A" }, "A"),
  h("h3", { key: "B" }, "B"),
  h("h3", { key: "C" }, "C"),
]);

let result = patch(container, VNode);
console.log(result);

const VNode2 = h("section", {}, [
  h("h3", { key: "A" }, "A"),
  h("h3", { key: "B" }, "B"),
  h("h3", { key: "M" }, "M"),
  h("h3", { key: "N" }, "N"),
  h("h3", { key: "C" }, "C"),
  h("h3", { key: "Q" }, "Q"),
  h("h3", { key: "T" }, "T"),
]);

// const VNode2 = h("h1", {}, "hello VNode");
btn.onclick = function () {
  patch(VNode, VNode2);
};
