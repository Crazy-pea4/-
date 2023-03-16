commonjs 和 esm 的主要区别可以概括成以下几点：

1. 输出拷贝 vs 输出引用

2. esm 的 import read-only 特性

3. esm 存在 export/import 提升

下面对这三点做具体分析。

## 输出拷贝 vs 输出引用

首先看个 commonjs 输出拷贝的例子：

```js
// a.js
let a = 1;
let b = { num: 1 };
setTimeout(() => {
  a = 2;
  b = { num: 2 };
}, 200);
module.exports = {
  a,
  b,
};

// main.js
// node main.js
let { a, b } = require("./a");
console.log(a); // 1
console.log(b); // { num: 1 }
setTimeout(() => {
  console.log(a); // 1
  console.log(b); // { num: 1 }
}, 500);
```

所谓输出拷贝：module.exports 对象是模块内外的唯一关联， commonjs 输出的内容，就是 exports 对象的属性，模块运行结束，属性就确定了。

```js
再看 esm 输出引用的例子：
// a.mjs
let a = 1;
let b = { num: 1 }
setTimeout(() => {
a = 2;
b = { num: 2 };
}, 200);
export {
a,
b,
};

// main.mjs
import { a, b } from "./a";
console.log(a); // 1
console.log(b); // { num: 1 }
setTimeout(() => {
  console.log(a); // 2
  console.log(b); // { num: 2 }
}, 500);
```

这就是 esm 输出引用跟 commonjs 输出值的区别，模块内部引用的变化，会反应在外部，这是 esm 的规范。

## esm 的 import read-only 特性

read-only 的特性很好理解，import 的属性是只读的，不能赋值，类似于 const 的特性，这里就不举例解释了。

## esm 存在 export/import 提升

esm 对于 import/export 存在提升的特性，具体表现是规范规定 import/export 必须位于模块顶级，不能位于作用域内；其次对于模块内的 import/export 会提升到模块顶部，这是在编译阶段完成的。
