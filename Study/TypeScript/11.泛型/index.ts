/**
 *  1. 泛型类型
 */
function fn<Type>(arg: Type): Type {
  return arg;
}
// 定义myFn是一个根据用户自行输入来判断实参类型的函数。其与定义的fn函相对应
let myFn: <Type>(arg: Type) => Type = fn;
console.log(myFn(1111));

/**
 *  2. 泛型类
 */
class MyClass<T> {
  readonly name: T;
  constructor(name: T) {
    this.name = name;
  }
}
// 与函数类似，生成实例时可以选择传或不传类型

// let thisClass = new MyClass("猪八戒");
let thisClass = new MyClass<string>("猪八戒");

/**
 *  3. 泛型约束中使用类型参数
 *    - xxx extends keyof yyy 意思为：xxx必须限制在是yyy的key
 *
 *    keyof操作符：用来定义一个类型属于另一个类型的key
 *    例：
 *    type Person = { name: string, age: number }
 *    type NameOrAge = keyof Person     // 'name' | 'age'
 *    const p1: NameOrAge = 'name'
 *    const p2: NameOrAge = 'age'
 *    const err: NameOrAge = 'x'        // 报错
 */

function getValue<Type, Key extends keyof Type>(
  obj: Type,
  key: Key
): Type[Key] {
  return obj[key];
}

const o = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(getValue(o, "a"));

/**
 *  4. 类类型，规定一个变量的类型是一个类
 */

abstract class Person {
  type: string = "human";
}
class jackieChan extends Person {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}
class yaoming extends Person {
  name: string;
  constructor(name: string) {
    super();
    this.name = name;
  }
}

// 指定传进来的第一个参数必须是Person类，其函数返回值也是一个Person类(创建出来的实例)
function whoAmI<Person>(c: new (name: string) => Person, prop: string): Person {
  return new c(prop);
}

console.log(whoAmI(jackieChan, "成龙").type);
