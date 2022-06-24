var obj = {
    name: "11",
    age: 18,
    sayHi: function () { }
};
var myClass = /** @class */ (function () {
    function myClass(name) {
        this.name = name;
    }
    myClass.prototype.sayHello = function () {
        console.log('hello');
    };
    return myClass;
}());
