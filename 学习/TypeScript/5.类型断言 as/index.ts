// 类型断言 as（两种写法）
const button1 = document.querySelector("button") as HTMLButtonElement;

const button2 = <HTMLButtonElement>document.querySelector("button");

const str = ("hello" as unknown) as number;
const number = <number>153;
