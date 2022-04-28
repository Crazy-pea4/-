// 字符串文字类型
let x: "hello" = "hello";
// x = 'world'      //不能将类型“"world"”分配给类型“"hello"”。
function print(s: string, choose: "left" | "right" | "center") {
  console.log(s, choose);
}
print("你好", "left");

// 数字文字类型
function compare(a: number, b: number): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
  // return a === b ? 0 : a > b ? 1 : 3;  // 不能将类型“3”分配给类型“0 | 1 | -1”
}
console.log(compare(6, 3));

// 混合用法
interface info {
  name: string;
}
function detail(x: info | "周杰伦") {
  console.log(x);
}
detail({
  name: "陈奕迅",
});
// detail('周杰') // 报错

// 布尔文字类型
let p1: true = true;
let p2: false = false;

// 可能遇到的问题
function request(req: string, method: "get" | "post" | "put") {
  console.log("location: " + req + "\nmethod is: " + method);
}
const obj = {
  url: "http://localhost:80",
  method: "get",
};
// request(obj.url, obj.method)    // 类型“string”的参数不能赋给类型“"get" | "post" | "put"”的参数。
// 这是因为TS会自动进行类型推断，将obj里的url和method推断为string类型
// 解决办法：1. 在传参时给obj.method进行类型断言
request(obj.url, obj.method as "get");
// 2. 在obj对象里给method进行类型断言，这里就不演示了
// 3. 给obj进行类型断言，const obj = { ... } as const
