// 使用类型别名来描述一个对象的类型
type myType = {
  name: string;
  age: number;
};

/**
 *      接口
 *      - 用来定义一个对象或类的结构，规定其中有哪些属性和方法，并且限制其类型或返回值
 *      - 与type不同的是，type不能重新声明，interface可以重复声明（相当于扩展）
 *      - 接口只定义对象的结构，不考虑具体值
 */

// 使用接口来限制对象的结构
interface myInterfaces {
  name: string;
  age: number;
  sayHi(): void;
}

const obj: myInterfaces = {
  name: "11",
  age: 18,
  sayHi: () => {},
};

// 使用接口来限制类的结构
interface myInter {
  name: string;
//   sayHello(): void;
}

class myClass implements myInter {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHello(): void {
    console.log('hello');
  }
}
