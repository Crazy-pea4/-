/**
 * function fn(a: number): number {
 *      return a;
 * }
 * 有时候有的函数会是上面的情况，返回值是参数，那么限制返回值的类型也要随着传入的参数类型一同改变
 */
/**
 * 这种情况下就适合使用泛型。function fn<F>(a: F): F { return a };
 *      <F>就是定义了一个名为F的泛型
 */

/** 函数中使用泛型 */
function fn<F>(a: F): F {
  return a;
}

console.log(typeof fn(10)); // 不指定泛型，有TS自动推断
console.log(typeof fn<string>("熊二")); // 手动指定泛型

/** 多泛型使用 */
function fn2<T, Q>(a: T, b: Q): T {
  console.log(typeof b);
  return a;
}
console.log(typeof fn2<number, string>(18, "你好"));

/** 泛型限制条件 */
interface Inter {
  length: number;
}
// 也可以不用extend，直接用Inter当泛型来限制
function fn3<T extends Inter>(a: T): T {
  // 此时泛型T已经可以限制传入的参数中必须包含length属性，且值类型为number
  return a;
}
fn3("123"); // 传入一个字符串，其内部有length属性且值类型为number
fn3({ length: 10 }); // 传入一个对象，其内部有length属性且值类型为number
// fn3(456); // 报错，数字型内部没有length属性

/** 类中使用泛型 */
class MyClass<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}
let thisClass = new MyClass<string>("猪八戒");

/**
 * 总之，泛型就是对于传入的变量，其类型不明确的情况下，我们定义一个变量用来储存传入参数的类型，这个变量就是泛型
 */
