import createEle from "./createElement";
export default function patchVNode(oldVNode, newVNode) {
  if (oldVNode === newVNode) return;
  // 判断newVNode是否有text属性（在这里的diff算法中text和children属性只同时存在一个，即有一方是undefined）
  if (newVNode.text) {
    // 如果新旧节点的text不同，则
    if (newVNode.text !== oldVNode.text) {
      oldVNode.elm.innerText = newVNode.text;
    }
  } else {
    // 如果oldVNode有children
    if (oldVNode.children) {
      // 额外索引，只有在新旧子节点相同时才增加。负责要在中间插入的节点
      let index = 0;
      for (const i of newVNode.children) {
        // 标识符，在每次外层循环重置
        let isExist = false;
        for (const j of oldVNode.children) {
          if (i.sel === j.sel && i.key === j.key) {
            isExist = true;
            break;
          }
        }
        // 出现新子节点，即它不存在与旧子节点数组中时
        if (!isExist) {
          let domNode = createEle(i);
          // 当index走完了oldVNode时，证明剩下的新子节点都是在最后一个旧子节点后面插入的
          if (index < oldVNode.children.length)
            oldVNode.elm.insertBefore(domNode, oldVNode.children[index].elm);
          else oldVNode.elm.appendChild(domNode);
          console.log(i, index, oldVNode);
        } else {
          index++;
        }
      }
    } else {
      oldVNode.elm.innerText = "";
      let domNode = createEle(newVNode);
      oldVNode.elm.appendChild(domNode);
    }
  }
}
