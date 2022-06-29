export default class Scanner {
  constructor(tempStr) {
    this.tempStr = tempStr;
    // 指针
    this.pos = 0;
    // 尾部（包含指针）
    this.tail = tempStr;
  }
  // mustache的扫描 （扫描{{}}），无返回值
  scan(tag) {
    if (this.tail.indexOf(tag) == 0) {
      // tag指的是{{，需要指针跳过{{，以便scanUntil函数顺利使用
      this.pos = this.pos + tag.length;
      this.tail = this.tempStr.substring(this.pos);
    }
  }
  // 非mustache的扫描，返回扫描开始到结束的内容
  scanUntil(stopTag) {
    // 记录当前尾部的头部指针位置
    let tailHead = this.pos;
    // 当尾部的开头不是停止符时，指针继续前移，尾部适应变化
    while (this.tail.indexOf(stopTag) !== 0 && this.tail !== "") {
      this.pos++;
      this.tail = this.tempStr.substring(this.pos);
    }
    // 返回从开始到扫描到{为止的字符串（不包括{本身）
    return this.tempStr.substring(tailHead, this.pos);
  }
}
