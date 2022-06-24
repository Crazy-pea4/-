/**
 * 在下面的例子中，我们希望父类laptop只是作为一个公共的抽象的一个引用概念，而不希望它创建出实例对象
 *      因此我们可以给有这样要求的类一个关键字
 *  - 以abstract开头的类就是抽象类
 *      抽象类可以添加抽象方法。抽象方法没有函数体仅作为一个代表
 */

// 定义了一个抽象类laptop
abstract class laptop {
  name: string;
  performance: number;

  constructor(name: string, performance: number) {
    this.name = name;
    this.performance = performance;
  }
  // 定义一个抽象方法
  abstract playGames(): void;
}

class lianxiang extends laptop {
  playGames() {
    console.log('游戏中');
  }
}

// 尝试创建抽象类的实例对象
// let c = new laptop(); // 报错

let x = new lianxiang("联想", 90);
x.playGames();
