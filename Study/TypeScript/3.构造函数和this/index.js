var Car = /** @class */ (function () {
    /**
     * constructor 构造函数
     *      会在对象创建时调用
     */
    function Car(name) {
        // 构造函数中的this表示创建出来的实例对象
        this.name = name;
    }
    Car.prototype.showThis = function () {
        // 这里this指向调用者
        console.log(this);
    };
    return Car;
}());
var bmw = new Car("宝马");
console.log(bmw.name);
bmw.showThis();
