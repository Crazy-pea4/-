/**
 *      类型别名
 *      - 用来定义使用者的结构
 */

// 定义普通类型
type myType1 = string | number | boolean;

// 定义引用类型
type myType2 = number[];

// 在定义函数时，采用箭头函数的形式
type myType3 = (p: string) => void;

type myType4 = {
  name: string;
  age: number;
  arr: myType2;
  func: myType3;
};

/**
 *      接口
 *      - 用来定义一个对象或类的结构，规定其中有哪些属性和方法，并且限制其类型或返回值
 *      - 与type不同的是，type不能重新声明，interface可以重复声明（相当于扩展）
 *      - 接口只定义对象的结构，不考虑具体值
 *      interface myInter [extends xxx, [yyy]] {}
 */

// 使用接口来限制对象的结构
interface myInterfaces1 {
  name: string;
  age: number;
  sayHi: (p: string) => void;
}

const obj: myInterfaces1 = {
  name: "11",
  age: 18,
  sayHi: (p) => {},
};
obj.sayHi("");

// 使用接口来限制函数（与平常的有些不一样，通过  (p1: type, p2: type, ...): type  的形式）
interface myInterfaces2 {
  (p: string, age: number): void;
}
let fn: myInterfaces2 = (): void => {};
fn("", 0);

// 使用接口来限制类的结构
interface myInter {
  name: string;
  sayHello: () => void;
}

// 使用implement扩展class类
class myClass implements myInter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello() {
    console.log("hello");
  }
}
