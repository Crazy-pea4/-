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
var Person = /** @class */ (function () {
    function Person(name, age) {
        this._name = name;
        this._age = age;
    }
    Object.defineProperty(Person.prototype, "name", {
        // 使用下面代码可以间接地让外部访问、修改
        // getName(): string {
        //   return this.name;
        // }
        // setName(name: string) {
        //   this.name = name;
        // }
        // getAge(): number {
        //   return this.age;
        // }
        // setAge(age: number) {
        //   if (age > 0) {
        //     this.age = age;
        //   }
        // }
        // 但上面代码太麻烦，TS提供了自带的getter、setter方法实现上面功能
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (value) {
            if (value > 0) {
                this._age = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var person = new Person("刘二", 18);
// 尝试获取name和age
// console.log(person.name); // 报错
// console.log(person.age); // 报错
// 使用自定义方法获取、修改熟悉
// person.setName("光头强");
// console.log(person.getName());
// person.setAge(-7);
// console.log(person.getAge());
// 使用TS的getter、setter
person.name = "熊大";
console.log(person.name);
person.age = -100;
console.log(person.age);
// 验证protected
var Father = /** @class */ (function () {
    function Father(name) {
        this.name = name;
    }
    return Father;
}());
var Son = /** @class */ (function (_super) {
    __extends(Son, _super);
    function Son() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Son.prototype.showName = function () {
        // 在子类中可以访问
        console.log(this.name);
    };
    return Son;
}(Father));
// let son = new Son('派大星');
// console.log(son.name); // 报错
/** 语法糖
 * class c {
 *    name: string;
 *    age: number;
 *
 *    constructor(name: string, age: number) {
 *        this.name = name;
 *        this.age = age;
 *    }
 * }
 */
var C = /** @class */ (function () {
    // 直接将属性定义在构造函数中
    function C(name, age) {
        this.name = name;
        this.age = age;
    }
    return C;
}());
var c = new C('孙悟空', 501);
console.log(c);
