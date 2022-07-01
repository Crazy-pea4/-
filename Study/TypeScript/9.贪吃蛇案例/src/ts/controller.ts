import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

export default class controller {
  // 创建三个类的实例
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  view: HTMLElement;
  // 存储移动方向
  direction: string = "";
  // 储存蛇的生存状况
  isAlive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.view = document.getElementById("view")!;
    this.init();
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.key !== "F12") {
      e.preventDefault();
    }
    this.direction = e.key;
  }
  // 游戏初始化
  init() {
    // 需要给keyDownHandler重新绑定一下当前的this，否则在其内部this指向会错误
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    this.food.changePosition();
    this.run();
  }
  isOutLimit(X: number, Y: number, distance: number): boolean {
    if (X < 0 || X > this.view.clientWidth - distance) {
      return false;
    } else if (Y < 0 || Y > this.view.clientHeight - distance) {
      return false;
    } else {
      return true;
    }
  }
  isEaten(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.scorePanel.addScore();
      this.food.changePosition();
      this.snake.addBody();
    }
  }
  run() {
    // 获取蛇当前坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 设置每次移动的距离（等于其自身长度）
    let distance = this.snake.headWidth;
    switch (this.direction) {
      case "ArrowUp":
        Y -= distance;
        break;
      case "ArrowRight":
        X += distance;
        break;
      case "ArrowDown":
        Y += distance;
        break;
      case "ArrowLeft":
        X -= distance;
        break;
      default:
        break;
    }

    // 检测是否吃到食物
    this.isEaten(X, Y);
    // 检测是否碰壁
    if (this.isOutLimit(X, Y, distance)) {
      if (this.snake.isBodyHitHead()) {
        this.isAlive = false;
        alert("游戏结束！！");
        return;
      } else {
        this.snake.X = X;
        this.snake.Y = Y;
      }
    } else {
      this.isAlive = false;
      alert("游戏结束！！");
      return;
    }
    this.isAlive &&
      setTimeout(() => {
        this.run();
      }, 150 - (this.scorePanel.level - 1) * 12);
  }
}
