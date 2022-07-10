/**
 *      ts中函数的限制
 * */
let fn1: (s: string) => void;
fn1 = (s: string) => {
  console.log(s);
};
fn1("我是函数");
// 简写
let fn2: (s: string) => void = (s: string) => {
  /* Do something */
};

/**
 *      函数签名  -让函数可以像普通对象一样拥有属性
 *      也称调用签名，就是说在函数体中调用函数是需要签名的
 *              - 函数签名是有些绕的，我们在传参是指定一个Function类型也能表明我们要传递一个函数
 *                但在这里我们不仅仅要传递函数，我们还想给它加上类型，就不得不用type或interface来定义
 *                而用他们来定义就需要一个函数签名来表明他们是为函数服务的
 */

type describableFn = {
  desc: string;
  (s: string): void;
};
function doSomething(fn: describableFn): void {
  console.log(fn("我是函数签名"), fn.desc);
}
function fn3(s: string) {
  return s;
}
fn3.desc = "我是函数身上的属性";
doSomething(fn3);

/**
 *    构造签名  - 就是用来约束构造函数的创建
 *    同样的，在函数体中调用构造函数也需要签名，就是这里的构造签名
 */

class myClass {
  some: string;
  constructor(s: string) {
    this.some = s;
  }
}
// 此时以及可以来用上面的myCalss，但是ts希望若函数中的形参是一个类，则在使用时必须用new
type Ctor = {
  new (s: string): myClass;
};
// 于是我们在type中指定使用这个type的形参必须是一个可new的构造函数或类
function fn4(p: Ctor) {
  return new p("我是构造签名");
}
console.log(fn4(myClass));
