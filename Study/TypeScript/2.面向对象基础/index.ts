/**
 * 对象：就是一系列的属性和方法的集合
 */
class Person {
  /**
   * 直接定义的属性是实例属性，需要通过对象创建出来的实例去访问
   *      const per = new Person();
   *      per.name
   *
   * 而使用static关键字的属性是静态属性（类属性），可以直接通过类去访问
   *    Person.age
   * readonly：设置变量只读
   */
  readonly name: string = "二郎神";
  static readonly age: number = 500;

  /**
   * 定义方法：同样分为
   * 直接定义
   * 使用static定义
   */
  sayHi() {
    console.log("hi，你好");
  }
  static sayYes() {
    console.log("Yes~");
  }
}

const per = new Person();
console.log("我是实例属性", per.name);
console.log("我是静态属性", Person.age);
per.sayHi();
Person.sayYes();
