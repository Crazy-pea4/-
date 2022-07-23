import vnode from "./vnode";

/**
 *      目前实现的h函数只要求是下面三种形态即可
 *      1. h('div', {}, 'text')
 *      2. h('div', {}, [])
 *      3. h('div', {}, h())
 */

export default function (sel, data, val) {
  // 检查参数val类型
  if (typeof val === "string") {
    return vnode(sel, data, undefined, val, undefined);
  } else if (val instanceof Array) {
    let children = [];
    // 遍历这个数组
    for (const i of val) {
      children.push(i);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (val.hasOwnProperty("sel")) {
    let children = [val];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new TypeError("传入的第三个参数类型不正确。");
  }
}
