export default class Food {
  // 定义食物、窗口属性
  el: HTMLElement;
  view: HTMLElement;
  head: HTMLElement;
  constructor() {
    this.el = document.getElementById("food")!;
    this.view = document.getElementById("view")!;
    this.head = document.getElementById("head")!;
  }
  // 获取食物的X、Y坐标
  get X() {
    return this.el.offsetLeft;
  }
  get Y() {
    return this.el.offsetTop;
  }
  changePosition() {
    // 生成一个随机范围（0~290）
    // 蛇每移动一次就是10，因此食物出现的坐标也必须是整十的
    let left;
    let top;
    do {
      left =
        Math.floor(
          Math.random() * (this.view.clientWidth / this.head.offsetWidth)
        ) * 10;
      top =
        Math.floor(
          Math.random() * (this.view.clientHeight / this.head.offsetHeight)
        ) * 10;
    } while (this.head.offsetLeft === left && this.head.offsetTop === top); // 防止出现食物与蛇头重合的情况

    this.el.style.top = top + "px";
    this.el.style.left = left + "px";
  }
}
