for...in 遍历一个对象的除 Symbol 以外的可枚举属性，包括继承的可枚举属性。

for...of 需要遍历对象有[Symbol.iterator]属性，也就是迭代器。

- [Symbol.iterator]返回一个对象，里面有`next`方法
- `next`方法本身返回`{ done: Boolean, value: any}`
