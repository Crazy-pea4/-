Function.prototype.myCall = function (targetObj, ...args) {
  /**
   *    手写call原理
   *        理解：当一个对象需要借用其他对象里面的方法时，给这个对象新增一个键值对，
   *        键名自定义，键值就是借用的方法。后面在这个对象中调用这个方法，那么this自然就是这个对象了
   *
   *        例：a.sayHi.myCall，myCall是由sayHi调用的，故函数体中的this就是sayHi
   */
  targetObj = targetObj || window; // js要求传进来的targetobj为非真值时，targetobj指向window
  const sKey = Symbol(); // 新建一个独一无二的key
  targetObj[sKey] = this; // 让这个key对应的value为借用的方法
  const result = targetObj[sKey](...args); // 调用方法并且传参，若有返回值则接收
  delete targetObj[sKey]; // 使用完毕后删除
  return result; // 返回结果
};
