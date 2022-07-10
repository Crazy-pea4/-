export default class Snake {
  head: HTMLElement;
  // HTMLCollection是一个元素集合，当它所算中的集合若是发生改变，它也会产生变化
  bodies: HTMLCollection;
  // 整个蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.querySelector(".snake")! as HTMLElement;
    this.head = document.getElementById("head")!;
    this.bodies = this.element.getElementsByTagName("div");
  }

  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  set X(x: number) {
    // 新值与旧值一样就不赋值了
    if (this.X === x) return;
    // 如果发生掉头行为（防掉头逻辑比较绕，要多看几遍  ）
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === x) {
      if (x > this.X) {
        // 假设现在蛇向左走，下一个循环指令是“向右”，那么传进来的x就会比this.X大，不希望蛇掉头，让它继续向左走（减10）
        x = this.X - 10;
      } else {
        x = this.X + 10;
      }
    }
    this.moveBodies();
    this.head.style.left = x + "px";
  }
  set Y(y: number) {
    if (this.Y === y) return;
    // 如果发生掉头行为
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === y) {
      if (y > this.Y) {
        // 假设现在蛇向上走，下一个循环指令是“向下”，那么传进来的y就会比this.Y大，不希望蛇掉头，让它继续向上走（减10）
        y = this.Y - 10;
      } else {
        y = this.Y + 10;
      }
    }
    this.moveBodies();
    this.head.style.top = y + "px";
  }
  get headWidth() {
    return this.head.offsetWidth;
  }
  // 添加身体
  addBody() {
    let body = document.createElement("div");
    this.element.appendChild(body);
  }
  // 移动身体
  moveBodies() {
    /**
     *    基本逻辑就是上一个方块移到本方块所在的位置
     *    要从后往前（从尾巴到头部）依次设置位置
     *      第4节 ---> 第3节
     *      第3节 ---> 第2节
     *      第2节 ---> 第1节
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面一节身体的坐标
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      // 将前面一节身体坐标赋值给当前身体坐标
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检测蛇是否碰到自身
  isBodyHitHead() {
    if (this.bodies.length > 1) {
      for (let i = 1; i < this.bodies.length; i++) {
        let body = this.bodies[i] as HTMLElement;
        if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
          return true;
        }
      }
    }
  }
}
