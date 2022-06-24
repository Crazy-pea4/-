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
// 定义了一个抽象类laptop
var laptop = /** @class */ (function () {
    function laptop(name, performance) {
        this.name = name;
        this.performance = performance;
    }
    laptop.prototype.playGames = function () {
        console.log("正在玩游戏......");
    };
    return laptop;
}());
var lianxiang = /** @class */ (function (_super) {
    __extends(lianxiang, _super);
    function lianxiang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return lianxiang;
}(laptop));
// 尝试创建抽象类的实例对象
// let c = new laptop(); // 报错
var x = new lianxiang("联想", 90);
x.playGames();
/**
 * 在上面的例子中，我们希望父类laptop只是作为一个公共的抽象的一个引用概念，而不希望它创建出实例对象
 *      因此我们可以给有这样要求的类一个关键字
 *  - 以abstract开头的类就是抽象类
 *      抽象类可以添加抽象方法
 */
