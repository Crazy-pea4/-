/**
 *  Vue2中监听数组变化：
 *      1. 以数组的原型对象为指向，新增一个arrayMethods对象让其原型链指向数组的原型对象
 *      2. arrayMethods对象内部拿到数组原型对象身上的push pop等方法，在里面进行改写
 *      3. 让所有的数组的原型链指向arrayMethods对象
 */

import { def } from "./utils";

const arrayPrototype = Array.prototype;
const generalArrayMethods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];
// 使用Object.create()创建一个对象，并使其原型链指向传入原型对象
const arrayMethods = Object.create(arrayPrototype);

generalArrayMethods.forEach((method) => {
  const origin = arrayPrototype[method];
  def(
    arrayMethods,
    method,
    function (...args) {
      /**
       *  将已经存在于数组身上的__ob__取出来
       * （因为Vue2的data配置项一定是一个对象，里面的数组已经经过 def(value, "__ob__", this, false) 操作了）
       *  进行下一步操作
       */
      let ob = this.__ob__;
      /**
       *  在上面7种常用数组方法中，push、unshift、splice都可以添加元素
       *  因此，我们还需要对添加的元素进行observe
       */
      let inserted = [];

      switch (method) {
        case "posh":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          // 不要搞混了，这里去到的是想要新增的值，例如splice(0, 0, 'insertVal')
          inserted = args.slice(2);
          break;
      }

      if (inserted.length > 0) {
        ob.walkButArray(inserted);
      }
      ob.dep.notify();
      console.log(`我是${method}方法`, args);
      /** 核心：将原本的数组方法给做响应式处理的数组，传参并调用 */
      const result = origin.apply(this, args);
      return result;
    },
    false
  );
});
export default arrayMethods;
