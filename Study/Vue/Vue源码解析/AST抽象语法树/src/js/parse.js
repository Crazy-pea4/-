import parseAttrs from "./parseAttrs";

export default function (template) {
  // startTag（第一个分组是标签名字，第二个分组是attrs）
  const sReg = /^\<([a-zA-Z]+[1-9]?)(\s[^>]+)?\>/;
  // endTag（）
  const eReg = /^\<\/([a-zA-Z]+[1-9]?)\>/;
  const wordReg = /^([\w]+)\<\/[a-zA-Z]+[1-9]?\>/;
  let rest = template;
  let index = 0;
  const tagStack = [];
  const valueStack = [{ children: [] }];

  while (index < template.length - 1) {
    rest = template.substr(index);
    if (sReg.test(rest)) {
      // 标签开始
      const sTarget = rest.match(sReg)[1];
      // 标签属性（有些标签有属性有些没有，所以要做判断处理）
      let attrs = rest.match(sReg)[2];
      attrs = parseAttrs(attrs);
      console.log("标签开始", sTarget, rest.match(sReg));
      tagStack.push(sTarget);
      valueStack.push({ tag: sTarget, children: [], attrs: attrs });
      // 只sTarget只获取到<xxx>内部的xxx，还要加上<>本身占的两个字符
      const attrsLength = attrs != undefined ? attrs.length : 0;
      index += sTarget.length + attrsLength + 2;
    } else if (eReg.test(rest)) {
      // 标签结束
      const eTarget = rest.match(eReg)[1];
      console.log("标签结束", eTarget);
      if (eTarget === tagStack[tagStack.length - 1]) {
        const popTag = tagStack.pop();
        const popValue = valueStack.pop();
        valueStack[valueStack.length - 1].children.push(popValue);
        console.log(tagStack, JSON.stringify(valueStack));
      } else {
        throw new Error("tag is not sealed");
      }
      // 这里的+3 是因为还要算上 /
      index += eTarget.length + 3;
    } else if (wordReg.test(rest)) {
      // 处理开始标签与结束标签之间的文本
      const word = rest.match(wordReg)[1];
      valueStack[valueStack.length - 1].children.push({ text: word, type: 3 });
      console.log("文字信息", word);
      index += word.length;
    } else {
      index++;
    }
  }
  return valueStack[0].children;
}
