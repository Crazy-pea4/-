class laptop {
  // 公共属性
  name: string;
  performance: number;

  constructor(name: string, performance: number) {
    this.name = name;
    this.performance = performance;
  }
  // 公共方法
  playGames() {
    console.log("正在玩游戏......");
  }

  callback() {
    console.log("我是父类的方法callback");
  }
}

/**
 *      继承：
 *          语法： son extends father
 *          - 使用继承后，子类将会拥有父类所有的方法和属性
 *          - 通过几次恒可以将多个类中共有的代码写在一个父类中
 *              如果需要额外添加一些子类特有的属性或方法，直接在子类中添加即可
 *          - 如果子类中添加了和父亲相同的方法，则以子类为主。称为方法重写
 */

class lianxiang extends laptop {
  // 单独新定义一个方法
  sheep() {
    console.log("i felt asleep");
  }
  callback() {
    console.log("我是子类的方法callback");
  }
  useSuper() {
    // super关键字，就相当于父类构造函数本身
    super.callback();
  }
  test: number;
  constructor(name: string, performance: number) {
    // super() 在super后面加上()括号相当于是通知父类的constructor并携带参数。父类constructor中的逻辑就作用到继承者身上
    super(name, performance);
    this.test = 11;
  }
}

let x = new lianxiang("联想", 90);
console.log(x);
// 调用父类方法
x.playGames();
// 调用子类方法
x.sheep();
// 验证方法重写
x.callback();

// --------------------------------------super--------------------------------------------
x.useSuper();
