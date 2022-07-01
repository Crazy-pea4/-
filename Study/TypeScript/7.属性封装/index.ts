class Person {
  /**
   * 观察下面的代码，会发现name和age属性都是不安全的，可以被随意更改的
   * 除了可以运用readonly，TS还提供了下面三种修饰符：
   *
   *    public 属性可以在任意位置访问、修改 默认值
   *    private 私有属性，只能在当前类的内部访问、修改（子类中也不能访问）
   *        - 通过在类中添加方法使得私有熟悉可以被外部访问
   *            但是这样不能在外部访问的话，体现不出这个类的实现意义
   *            我们可以在类中定义一些方法手动控制这些熟悉的修改与获取
   *    protected 受保护的属性，只能在当前类和其子类中访问
   */
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  // 使用下面代码可以间接地让外部访问、修改
  // getName(): string {
  //   return this.name;
  // }
  // setName(name: string) {
  //   this.name = name;
  // }
  // getAge(): number {
  //   return this.age;
  // }
  // setAge(age: number) {
  //   if (age > 0) {
  //     this.age = age;
  //   }
  // }

  // 但上面代码太麻烦，TS提供了自带的getter、setter方法实现上面功能
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value > 0) {
      this._age = value;
    }
  }
}

const person = new Person("刘二", 18);

// 尝试获取name和age
// console.log(person.name); // 报错
// console.log(person.age); // 报错

// 使用自定义方法获取、修改熟悉
// person.setName("光头强");
// console.log(person.getName());
// person.setAge(-7);
// console.log(person.getAge());

// 使用TS的getter、setter
person.name = "熊大";
console.log(person.name);
person.age = -100;
console.log(person.age);

// 验证protected
class Father {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}
class Son extends Father {
  showName(): void {
    // 在子类中可以访问
    console.log(this.name);
  }
}
// let son = new Son('派大星');
// console.log(son.name); // 报错

/** 语法糖
 * class c {
 *    name: string;
 *    age: number;
 *    
 *    constructor(name: string, age: number) {
 *        this.name = name;
 *        this.age = age;
 *    }
 * }
 */
class C {
  // 直接将属性定义在构造函数中
  constructor(public name: string, public age: number) {
  }
}
let c = new C('孙悟空', 501);
console.log(c);

