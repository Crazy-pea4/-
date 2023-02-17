/**
 * 闭包：是内部函数与外部函数沟通的桥梁
 *  特点：
 *      1. 数据私有性
 *      2. 延长变量生存时间
 *  闭包在JavaScript语言中相当于是在不同的执行上下文中维护了一条作用域链，
 *  在该作用域链内使用到的变量对象就不会被垃圾回收机制清除
 *
 *  函数执行的时候会创建上下文，会去找对应的变量对象。执行上下文会像压栈一样从全局执行上下文开始入栈
 */

function foods() {
  // foods函数执行上下文找到了 food 变量对象，这两个函数执行上下文行维护了一条它们之间的作用域链
  var food = "苹果";
  return function () {
    // 返回的匿名函数执行上下文中没有 food 变量对象，于是向栈底查找
    console.log(food);
  };
}

var f = foods();
f();

// /** 面试题 */
// for (var i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i++);
//   }, 1000);
// }
// console.log(i); // 5 5 6 7 8 9   i == 10
// // 如何修改？把输入变成 5 0 1 2 3 4
// for (var i = 0; i < 5; i++) {
//   (function (x) {
//     setTimeout(function () {
//       console.log(x++); // 这里把 ++去掉也可以了
//     }, 1000);
//   })(i);
// }
// console.log(i);

let arr = [];
for (var i = 0; i < 5; i++) {
  // 函数先定义而不执行，等到后面再执行，此时的变量对象就找到的是i==5
  arr[i] = function () {
    console.log(i);
  };
}
for (var j = 0; j < 5; j++) {
  arr[j]();
}
