import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 创建虚拟节点
let myVNode1 = h(
  "a",
  { props: { href: "https://www.bilibili.com" } },
  "哔哩哔哩"
);
let myVNode2 = h("div", { props: { class: "box" } }, "我是一个盒子");
// 嵌套生成虚拟节点
let myVNode3 = h("ul", {}, [
  h("li", {}, "编程"),
  h("li", {}, "摸鱼"),
  h("li", {}, "玩游戏"),
]);

// 让虚拟节点上树
const container1 = document.getElementById("container1");
patch(container1, myVNode1);
const container2 = document.getElementById("container2");
patch(container2, myVNode2);
const container3 = document.getElementById("container3");
patch(container3, myVNode3);
