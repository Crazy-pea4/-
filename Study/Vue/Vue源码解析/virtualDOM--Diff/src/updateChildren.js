import patchVNode from "./patchVNode";
import createEle from "./createElement";

function isSameVNode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}

export default function (parentElm, oldCh, newCh) {
  // 旧前
  let oldStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新前
  let newStartIdx = 0;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前节点
  let oldStartVNode = oldCh[0];
  // 旧后节点
  let oldEndVNode = oldCh[oldEndIdx];
  // 新前节点
  let newStartVNode = newCh[0];
  // 新后节点
  let newEndVNode = newCh[newEndIdx];
  // key集合
  let keyMap;

  // 循环判断
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("死循环中");
    if (!oldStartVNode) {
      oldStartVNode = oldCh[++oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndVNode = oldCh[--oldEnd];
    }
    // 旧前新前
    if (isSameVNode(oldStartVNode, newStartVNode)) {
      console.log("1.旧前新前");
      patchVNode(oldStartVNode, newStartVNode);
      oldStartVNode = oldCh[++oldStartIdx];
      newStartVNode = newCh[++newStartIdx];
    } else if (isSameVNode(oldEndVNode, newEndVNode)) {
      // 旧后新后
      console.log("2.旧后新后");
      patchVNode(oldEndVNode, newEndVNode);
      oldEndVNode = oldCh[--oldEndIdx];
      newEndVNode = newCh[--newEndIdx];
    } else if (isSameVNode(oldStartVNode, newEndVNode)) {
      // 新后旧前
      console.log("3.新后旧前");
      patchVNode(oldStartVNode, newEndVNode);
      // 当新后旧前为相同节点时，移动新前指向的节点到旧后指向的节点的后面
      parentElm.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling);
      oldStartVNode = oldCh[++oldStartIdx];
      newEndVNode = newCh[--newEndIdx];
    } else if (isSameVNode(oldEndVNode, newStartVNode)) {
      // 新前旧后
      console.log("4.新前旧后");
      patchVNode(oldEndVNode, newStartVNode);
      // 当新前旧后为相同节点时，移动新后指向的节点到旧前指向的节点的后面
      parentElm.insertBefore(oldEndVNode.elm, oldStartVNode.elm);
      oldEndVNode = oldCh[--oldEndIdx];
      newStartVNode = newCh[++newStartIdx];
    } else {
      // 屁都没找到。。。
      if (!keyMap) {
        keyMap = {};
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      // 在keyMap中寻找新节点的当前项的索引
      const idxInOld = keyMap[newStartVNode.key];
      console.log(idxInOld);
      // 判断在keyMap中找不找得到这一项
      if (idxInOld) {
        console.log(oldCh[idxInOld]);
        patchVNode(oldCh[idxInOld], newStartVNode);
        parentElm.insertBefore(oldCh[idxInOld].elm, oldStartVNode.elm);
        oldCh[idxInOld] = undefined;
      } else {
        // 若idxInOld不存在
        parentElm.insertBefore(createEle(newStartVNode), oldStartVNode.elm);
        console.log(111);
      }
      newStartVNode = newCh[++newStartIdx];
    }
  }

  // 当循环结束了，startIdx还是小于等于endIdx
  if (newStartIdx <= newEndIdx) {
    console.log("还有新的剩余节点没处理");
    const before =
      newCh[newEndIdx + 1] === undefined ? undefined : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createEle(newCh[i]), before);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("还有旧的剩余节点没处理");
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
  console.log(parentElm);
}
