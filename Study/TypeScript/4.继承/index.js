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
var laptop = /** @class */ (function () {
    function laptop(name, performance) {
        this.name = name;
        this.performance = performance;
    }
    // 公共方法
    laptop.prototype.playGames = function () {
        console.log("正在玩游戏......");
    };
    laptop.prototype.callback = function () {
        console.log("我是父类的方法callback");
    };
    return laptop;
}());
/**
 *      继承：
 *          语法： son extends father
 *          - 使用继承后，子类将会拥有父类所有的方法和属性
 *          - 通过几次恒可以将多个类中共有的代码写在一个父类中
 *              如果需要额外添加一些子类特有的属性或方法，直接在子类中添加即可
 *          - 如果子类中添加了和父亲相同的方法，则以子类为主。称为方法重写
 */
var lianxiang = /** @class */ (function (_super) {
    __extends(lianxiang, _super);
    function lianxiang(name, performance) {
        var _this = 
        // super() 在super后面加上()括号相当于是通知父类的constructor并携带参数。父类constructor中的逻辑就作用到继承者身上
        _super.call(this, name, performance) || this;
        _this.test = 11;
        return _this;
    }
    // 单独新定义一个方法
    lianxiang.prototype.sheep = function () {
        console.log("i felt asleep");
    };
    lianxiang.prototype.callback = function () {
        console.log("我是子类的方法callback");
    };
    lianxiang.prototype.useSuper = function () {
        // super关键字，就相当于父类构造函数本身
        _super.prototype.callback.call(this);
    };
    return lianxiang;
}(laptop));
var x = new lianxiang("联想", 90);
console.log(x);
// 调用父类方法
x.playGames();
// 调用子类方法
x.sheep();
// 验证方法重写
x.callback();
// --------------------------------------super--------------------------------------------
x.useSuper();
