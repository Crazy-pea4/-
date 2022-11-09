
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function parseAttrs(attrs) {
    var result = [{}];
    if (attrs) {
      attrs = attrs.trim();
      console.log(attrs);
      var arr = attrs.split('"');
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          arr[i] = arr[i].trim();
          // 双数代表属性名
          if (i % 2 === 0) {
            // 删掉属性名最后面的 =
            arr[i] = arr[i].slice(0, -1);
            result[result.length - 1].name = arr[i];
            console.log(arr[i]);
          } else {
            // 单数代表属性值
            result[result.length - 1].value = arr[i];
            console.log(arr[i]);
            result.push({});
          }
        }
      }
      // 最后再移除掉多出来的一个空对象 {}
      result.splice(result.length - 1, 1);
      return result;
    } else return [];
    // return [{ name, value }];
  }

  function parse (template) {
    // startTag（第一个分组是标签名字，第二个分组是attrs）
    var sReg = /^\<([a-zA-Z]+[1-9]?)(\s[^>]+)?\>/;
    // endTag（）
    var eReg = /^\<\/([a-zA-Z]+[1-9]?)\>/;
    var wordReg = /^([\w]+)\<\/[a-zA-Z]+[1-9]?\>/;
    var rest = template;
    var index = 0;
    var tagStack = [];
    var valueStack = [{
      children: []
    }];
    while (index < template.length - 1) {
      rest = template.substr(index);
      if (sReg.test(rest)) {
        // 标签开始
        var sTarget = rest.match(sReg)[1];
        // 标签属性（有些标签有属性有些没有，所以要做判断处理）
        var attrs = rest.match(sReg)[2];
        attrs = parseAttrs(attrs);
        console.log("标签开始", sTarget, rest.match(sReg));
        tagStack.push(sTarget);
        valueStack.push({
          tag: sTarget,
          children: [],
          attrs: attrs
        });
        // 只sTarget只获取到<xxx>内部的xxx，还要加上<>本身占的两个字符
        var attrsLength = attrs != undefined ? attrs.length : 0;
        index += sTarget.length + attrsLength + 2;
      } else if (eReg.test(rest)) {
        // 标签结束
        var eTarget = rest.match(eReg)[1];
        console.log("标签结束", eTarget);
        if (eTarget === tagStack[tagStack.length - 1]) {
          tagStack.pop();
          var popValue = valueStack.pop();
          valueStack[valueStack.length - 1].children.push(popValue);
          console.log(tagStack, JSON.stringify(valueStack));
        } else {
          throw new Error("tag is not sealed");
        }
        // 这里的+3 是因为还要算上 /
        index += eTarget.length + 3;
      } else if (wordReg.test(rest)) {
        // 处理开始标签与结束标签之间的文本
        var word = rest.match(wordReg)[1];
        valueStack[valueStack.length - 1].children.push({
          text: word,
          type: 3
        });
        console.log("文字信息", word);
        index += word.length;
      } else {
        index++;
      }
    }
    return valueStack[0].children;
  }

  var template = "<div>\n      <h3 class=\"title sTitle\" id=\"t\">hello</h3>\n      <ul>\n        <li>1</li>\n        <li>2%%</li>\n        <li>3</li>\n      </ul>\n</div>";
  var str = parse(template);
  console.log(str);

}));
//# sourceMappingURL=ast.js.map
