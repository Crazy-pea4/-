import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const container3 = document.getElementById("container3");
const btn = document.getElementById("btn");

// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 创建虚拟节点
let myVNode1 = h("ul", {}, [
  h("li", { key: "A" }, "编程"),
  h("li", { key: "B" }, "摸鱼"),
  h("li", { key: "C" }, "玩游戏"),
]);

// 让虚拟节点上树
patch(container3, myVNode1);

btn.onclick = () => {
  // 增加新虚拟节点时，所加位置的不同对patch上树时的影响不同
  /**
   *  当在最后面加上时，不需要指定key，patch可以识别出谁是新的旧的
   *  当加在除了最后面以外的地方时，原本的VNode结构破坏，此时需要指定key才能让patch正确识别谁新谁旧
   */
  let myVNode2 = h("ul", {}, [
    h("li", { key: "D" }, "我是新来的！"),
    h("li", { key: "A" }, "编程"),
    h("li", { key: "B" }, "摸鱼"),
    h("li", { key: "C" }, "玩游戏"),
    // h("li", {}, "我是新来的！"),
  ]);
  patch(myVNode1, myVNode2);
};
