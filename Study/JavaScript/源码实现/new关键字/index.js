/**
 * 1. 创建空对象
 * 2. 设置原型链，将新对象的__proto__指向构造函数的prototype对象
 * 3. this指向新对象，执行构造函数的代码
 * 4. 判断：如果传入的对象类型是一个对象，返回新对象；反之。直接返回(new 1)
 *
 */

function myNew(fn, ...args) {
  let obj = new Object();
  obj.__proto__ = Object.getPrototypeOf(fn);
  const result = fn.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
