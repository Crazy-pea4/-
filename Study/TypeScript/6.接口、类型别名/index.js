/**
 *      类型别名
 *      - 用来定义使用者的结构
 */
var obj = {
    name: "11",
    age: 18,
    sayHi: function (p) { }
};
obj.sayHi("");
var fn = function () { };
fn("", 0);
// 使用implement扩展class类
var myClass = /** @class */ (function () {
    function myClass(name) {
        this.name = name;
    }
    myClass.prototype.sayHello = function () {
        console.log("hello");
    };
    return myClass;
}());
