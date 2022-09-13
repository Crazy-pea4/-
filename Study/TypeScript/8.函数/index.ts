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
 *      函数签名，也称调用签名。最前面没有函数名，有函数名则表示一个属性而不是签名
 *        -函数的调用签名 就是 当我们想给一个函数添加额外属性时(就像面对普通对象)，我们就需要使用
 *        type或interface来限制函数。因为函数本身也是个对象，在写完想要限定的属性后，还需要手动添加一个调用签名
 *        以此来通知ts这个用type或interface定义的对象是一个可以调用的对象，即函数。
 */

type describableFn = {
  desc: string;
  (s: string): void; // 这行就是函数调用签名。尝试把这行注掉
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
  new (s: string): myClass; // 注掉这行代码，是与上面一样的效果
};
// 于是我们在type中指定使用这个type的形参必须是一个可new的构造函数或类
function fn4(p: Ctor) {
  return new p("我是构造签名");
}
console.log(fn4(myClass));

/**
 *    函数重载
 *     - 在ts中，当一个函数没有写函数体时(连大括号都没有)，就是一个函数重载签名
 *     - 函数重载是由实现函数和重载函数构成，它们并且最大的区别就是，实现函数有函数体
 */

// 下面两行就是重载函数，下面有函数体的就是实现函数
function printSomething(msg: string): void;
function printSomething(person: string, word: string, aWord: string): void;
function printSomething(sentence: string, word?: string, aWord?: string): void {
  // 因为实现函数要和重载函数签名一致，即要兼顾一个参数也要兼顾三个参数，所以实现函数中第二、三个参数必须为可选
  if (word) {
    console.log("我是" + sentence + ", " + word + ", " + aWord);
  } else {
    console.log(sentence);
  }
}

printSomething("我是一段信息");
printSomething("派大星", "我喜欢海绵宝宝", "我也喜欢你");
// printSomething("如果我只发送两个参数", "那我就报错了"); // errMsg: 没有需要 2 参数的重载，但存在需要 1 或 3 参数的重载。
/**
 * 由此可见，函数重载就是为了方便我们看到输入什么就输出什么的情况，而不必去函数体中找对应的类型返回什么类型
 * 简单理解来看实现签名主要是之前普通实现思路的情况，TS编译的时候检查所有类型和函数体中的对比检查是否存在。
 * 实现签名和函数体检查通过后，执行函数的时候实际上是某个重载签名+函数体，跳过了实现签名。
 */
