// 基元类型string、number、boolean
let str: string = "123";
let number: number = 123;
let boolean: boolean = false;

console.log(typeof str, typeof number, typeof boolean);

// 数组     1. type[]   2. Array<type>
let arr1: number[] = [1, 2, 3, 4, 5, 6];
let arr2: Array<string> = ["我", "爱", "你"];
console.log(arr1, arr2);

// any --- 不希望某个特定值导致类型检查错误
let obj: any = {};
// 一下代码不会受到类型检查，但由于处在严格模式下，编译js文件会出错
// obj.a = 1;
// obj.foo();
// obj();
// obj = "hello";
// const n: number = obj;

// 函数 function fnName(params: type, ...): type || void （在函数外声明的是限制函数的返回值类型，可以选择void不返回任何值）
function fn(name: string): number {
  console.log("我是" + name + "。很高兴认识你");
  return 0;
}
fn("TS");

// 对象 --- 对于不清楚的参数，可以在后面加上 ? 代表可传可不传
function localtion(pt: { x: number; y: number; pic?: string }) {
  console.log("我现在的坐标是x：" + pt.x + ",y：" + pt.y);
  // 如果下面pt.pic后面不加 ? 会报错，因为pt.pic可能是undefined。尝试去掉 ? 看看
  console.log(pt.pic?.toUpperCase());
}
localtion({
  x: 5,
  y: 10,
});
