/*
    三种基本类型：number string boolean
*/
let num: number = 100;

let string: string = "me";

let boolean: boolean = true;

/*
    除了以上三种基本类型，ts还有以下类型：

    字面量      其本身                  限制变量的值就是该字面量的值
    any        *                       任意类型
    unknown     *                      类型安全的any
    void        空值（undefined）       没有值（或undefined）
    never       没有值                  不能是任何值
    object      {name:'孙悟空'}         任意的JS对象
    array       [1,2,3]                任意JS数组
    tuple       [4,5]                  元素，TS新增类型，固定长度数组
    enum        {A, B}枚举              TS中新增类型
*/
// 1.字面量
let num1: 10 = 10;
let string1: "hello" = "hello";
let some: boolean | string = false;

// 2.any（不推荐使用，相当于关闭类型检测）
let a: any;
a = 10;
a = "yes!";
a = true;

// 3.unknow 表示位置类型的值。它可以认为是可以安全使用的any
let u: unknown;
u = 10;
u = true;
u = "yes!";

// unknow和any的区别：
let s: string;
// s = a; // 将any类型a赋给s，原本a为true，此时却赋给了s，破坏了s的类型限制而且还不报错
// s = u; // 可以看到报错了，不能将类型“unknown”分配给类型“string”

// 为了解决unknown类型变量不能直接赋给string类型变量：
// 增加限制条件
if (typeof u === "string") {
  s = u;
}
// 类型断言：告诉解析器声明的变量是啥类型
/*
    语法：
    变量 as 类型
    <类型>变量
*/
s = u as string;
s = <string>u;

// 4.void 表示函数没有返回值（可以return undefined）
function fn1(): void {
  return;
}

// 5.never 表示永远不会返回结果
function fn2(): never {
  throw new Error("我是程序的终点，没有任何返回值包括undefined");
}

// 6.object 一般不使用，复杂数据类型都可以归纳为对象
let o: object;
o = [];
o = function () {};

// 一般是用 : {key: type, key: type, ...} 用来指定对象中可以包含那些属性
// 可以在属性名后加上 ? 来表示可选
let o1: { name: string; age?: number };
o1 = { name: "lucy" };
// [propName: string]: any 表示可以配置任意多个属性名且值任意
let o2: { name: string; [propName: string]: any };
o2 = { name: "mike", age: 19, gender: "male" };

/*
  设置函数结构的类型声明
      语法： (形参1: 类型, 形参2: 类型) => 返回值类型
*/
let o_fn: (a: number, b: number) => number;
o_fn = function (a, b) {
  return 18;
};

/*
  7.数组，两种书写方式
      类型[]
      Array<类型>
*/

let arr1: number[];
arr1 = [1, 2, 3, 5];
let arr2: string[];
arr2 = ["lucy", "mike"];
// 另一种声明方式
let arr3: Array<number>;
arr3 = [1, 2, 3];

/**
 *    8.元组tuple：固定长度的数组
 *        语法：[类型, 类型]
 */

let tuple: [string, string, string];
tuple = ["12", "23", "34"];

/**
 *    9.枚举enum
 */
enum gender {
  male, // 相当于male = 0
  female, // 相当于female = 1
}

let e: { name: string; gender: gender };
e = { name: "mike", gender: gender.male };

// & 的使用
let n: { name: string } & { age: number };
n = { name: "mike", age: 20 };

// 类型别名
type myString = string;
let k1: myString;
let k2: myString;
k1 = 'ji'
