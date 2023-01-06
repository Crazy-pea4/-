/**
 * 原理就是：
 *      1. 返回一个函数，函数体内是调用调用bind方法的函数的apply来更改this上下文
 *      2. 也可以理解成因为直接调用函数的apply会立即执行，那就先封装成一个函数，返回fn.apply调用的返回值
 *      3. bind返回的函数可以new，new后的this应该是实例而不是targetObj
 */
Function.prototype.myBind = function (targetObj, ...args1) {
  const that = this;
  // 接收传递的参数
  const arr1 = Array.prototype.slice.call(arguments, 1);
  console.log(arguments);
  function Bridge() {} // 连接原型的桥梁
  function fn(...args2) {
    const arr2 = Array.prototype.slice.call(arguments);
    // 拼接两个函数的形参数组
    const arrSum = arr1.concat(arr2);
    // 判断是否有被new
    if (this instanceof fn) {
      return that.apply(this, arrSum);
    } else {
      return that.apply(targetObj, arrSum);
    }
  }
  Bridge.prototype = that.prototype;
  fn.prototype = new Bridge();
  // fn.prototype = that.prototype;
  // fn.prototype.constructor = fn;
  return fn;
};
