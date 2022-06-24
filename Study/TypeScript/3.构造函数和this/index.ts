class Car {
  name: string;
  /**
   * constructor 构造函数
   *      会在对象创建时调用
   */
  constructor(name: string) {
    // 构造函数中的this表示创建出来的实例对象
    this.name = name;
  }

  showThis() {
    // 这里this指向调用者
    console.log(this);
  }
}

const bmw = new Car("宝马");

console.log(bmw.name);
bmw.showThis();
