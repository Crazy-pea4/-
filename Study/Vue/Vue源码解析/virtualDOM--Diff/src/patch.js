import createEle from "./createElement";
import vnode from "./vnode";
import patchVNode from "./patchVNode";

export default function (oldVNode, newVNode) {
  if (oldVNode.sel === undefined) {
    // 若oldVNode是真实节点而不是虚拟节点，包装它
    oldVNode = vnode(
      oldVNode.tagName.toLowerCase(),
      {},
      undefined,
      oldVNode.innerText,
      oldVNode
    );
  }
  // 判断是否为同一个节点
  if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
    patchVNode(oldVNode, newVNode);
  } else {
    // 不是同个节点，不用比较直接创建真实节点上树
    console.log("不是相同节点");
    let domNode = createEle(newVNode);
    console.log(domNode);
    if (oldVNode.elm.parentNode && domNode) {
      oldVNode.elm.parentNode.insertBefore(domNode, oldVNode.elm);
      // 删除老节点
      oldVNode.elm.parentNode.removeChild(oldVNode.elm);
    }
  }

  return newVNode;
}
