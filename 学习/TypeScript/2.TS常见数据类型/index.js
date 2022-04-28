"use strict";
// 基元类型string、number、boolean
let str = "123";
let number = 123;
let boolean = false;
console.log(typeof str, typeof number, typeof boolean);
// 数组     1. type[]   2. Array<type>
let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = ["我", "爱", "你"];
console.log(arr1, arr2);
// any --- 不希望某个特定值导致类型检查错误
let obj = {};
// 一下代码不会受到类型检查，但由于处在严格模式下，编译js文件会出错
// obj.a = 1;
// obj.foo();
// obj();
// obj = "hello";
// const n: number = obj;
// 函数 function fnName(params: type, ...): type || void （在函数外声明的是限制函数的返回值类型，可以选择void不返回任何值）
function fn(name) {
    console.log("我是" + name + "。很高兴认识你");
    return 0;
}
fn("TS");
// 对象 ---  在传入的对象参数中，各参数之间用分号或者逗号隔开。对于不清楚的参数，可以在后面加上 ? 代表可传可不传
function localtion(pt) {
    var _a;
    console.log("我现在的坐标是x：" + pt.x + ",y：" + pt.y);
    // 如果下面pt.pic后面不加 ? 会报错，因为pt.pic可能是undefined。尝试去掉 ?
    console.log((_a = pt.pic) === null || _a === void 0 ? void 0 : _a.toUpperCase());
}
// 但在下面的语句中，对象里的参数之间必须用逗号隔开，因为这是一个真的js对象
localtion({
    x: 5,
    y: 10,
});
