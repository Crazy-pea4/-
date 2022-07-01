export default class ScorePanel {
  private scoreNum: number = 0;
  private levelNum: number = 1;
  private scoreEle: HTMLElement;
  private levelEle: HTMLElement;
  constructor() {
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }

  addScore() {
    this.scoreNum++;
    this.scoreEle.innerText = this.score + "";
    if (this.scoreNum % 10 === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    this.levelNum++;
    this.levelEle.innerText = this.levelNum + "";
  }

  get score() {
    return this.scoreNum;
  }
  get level() {
    return this.levelNum;
  }
}
