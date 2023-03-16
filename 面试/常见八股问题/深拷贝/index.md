## 使用 JSON.stringify 和 JSON.parse

`JSON.parse(JSON.stringify(obj))`

缺点：

对函数是没办法处理的

对 Symbol 也是无法处理的

## 使用 Object.create()

`const obj = Object.create(proto)`

## 使用自定义深拷贝函数

```js
function deepCopy(targetObj, sourceObj) {
  for (k in sourceObj) {
    // 判断是否是属性值是否是复杂数据类型
    if (sourceObj[k] instanceof Array) {
      targetObj[k] = [];
      // 递归执行，将将目标对象中k的值（空数组）作为递归的第一个参数，源对象中的复杂数据类型作为第二个参数
      deepCopy(targetObj[k], sourceObj[k]);
    } else if (sourceObj[k] instanceof Object) {
      targetObj[k] = {};
      deepCopy(targetObj[k], sourceObj[k]);
    } else {
      // 当sourceObj[k]不再是复杂数据类型后
      targetObj[k] = sourceObj[k];
    }
  }
}
```

## 使用 lodash.deepCopy
