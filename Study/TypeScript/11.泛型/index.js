var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *  1. 泛型类型
 */
function fn(arg) {
    return arg;
}
// 定义myFn是一个根据用户自行输入来判断实参类型的函数。其与定义的fn函相对应
var myFn = fn;
console.log(myFn(1111));
/**
 *  2. 泛型类
 */
var MyClass = /** @class */ (function () {
    function MyClass(name) {
        this.name = name;
    }
    return MyClass;
}());
// 与函数类似，生成实例时可以选择传或不传类型
// let thisClass = new MyClass("猪八戒");
var thisClass = new MyClass("猪八戒");
/**
 *  3. 泛型约束中使用类型参数
 *    - xxx extends keyof yyy 意思为：xxx必须限制在是yyy的key
 */
function getValue(obj, key) {
    return obj[key];
}
var o = {
    a: 1,
    b: 2,
    c: 3
};
console.log(getValue(o, "a"));
/**
 *  4. 类类型，规定一个变量的类型是一个类
 */
var Person = /** @class */ (function () {
    function Person() {
        this.type = "human";
    }
    return Person;
}());
var jackieChan = /** @class */ (function (_super) {
    __extends(jackieChan, _super);
    function jackieChan(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return jackieChan;
}(Person));
var yaoming = /** @class */ (function (_super) {
    __extends(yaoming, _super);
    function yaoming(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return yaoming;
}(Person));
// 指定传进来的第一个参数必须是Person类，其函数返回值也是一个Person类(创建出来的实例)
function whoAmI(c, prop) {
    return new c(prop);
}
console.log(whoAmI(jackieChan, "成龙").type);
