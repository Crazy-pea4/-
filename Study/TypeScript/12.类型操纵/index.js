/**
 *  1. keyof操作符 ————用来定义一个类型属于另一个类型的key
 */
var p1 = "name";
var p2 = "age";
// const err: NameOrAge = 'x'        // 报错
/**
 *  2. typeof操作符 ————用来返回一个类型（不可以当成值使用）
 */
var s = "hello";
var t = "typescript";
var i11 = "超人";
var i12 = 23;
var i21 = "海绵宝宝";
var i22 = 15;
var i23 = true;
// 通过类型索引访问
var array = [
    { name: "John", age: 18 },
    { name: "lucy", age: 24 },
    { name: "mikey", age: 34 },
];
var x = {
    name: "John",
    age: 18
};
var age1 = 10;
var age2 = 23;
function someFn(matter) {
    if (typeof matter === "string") {
        return {
            noMass: true
        };
    }
    else {
        return {
            mass: 123
        };
    }
}
var a = someFn("ts"); // type a =
var b = someFn(123);
