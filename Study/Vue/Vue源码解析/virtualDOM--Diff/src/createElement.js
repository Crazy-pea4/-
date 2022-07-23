// 第一个参数为新的VNode，将要把旧的替换掉的。
export default function createEle(vnode) {
  let domNode = document.createElement(vnode.sel);
  // 有文字没有子节点
  if (vnode.text && vnode.text != "") {
    if (vnode.children === undefined || vnode.children.length === 0) {
      domNode.innerText = vnode.text;
    }
    // 当有子节点时
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    for (const i of vnode.children) {
      let childDom = createEle(i);
      domNode.appendChild(childDom);
    }
  }
  // 补充新节点的elm属性
  vnode.elm = domNode;

  return vnode.elm;
}
