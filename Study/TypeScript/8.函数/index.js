/**
 *      ts中函数的限制
 * */
var fn1;
fn1 = function (s) {
    console.log(s);
};
fn1("我是函数");
// 简写
var fn2 = function (s) {
    /* Do something */
};
function doSomething(fn) {
    console.log(fn("我是函数签名"), fn.desc);
}
function fn3(s) {
    return s;
}
fn3.desc = "我是函数身上的属性";
doSomething(fn3);
/**
 *    构造签名  - 就是用来约束构造函数的创建
 *    同样的，在函数体中调用构造函数也需要签名，就是这里的构造签名
 */
var myClass = /** @class */ (function () {
    function myClass(s) {
        this.some = s;
    }
    return myClass;
}());
// 于是我们在type中指定使用这个type的形参必须是一个可new的构造函数或类
function fn4(p) {
    return new p("我是构造签名");
}
console.log(fn4(myClass));
function printSomething(sentence, word, aWord) {
    // 因为实现函数要和重载函数签名一致，即要兼顾一个参数也要兼顾三个参数，所以实现函数中第二、三个参数必须为可选
    if (word) {
        console.log("我是" + sentence + ", " + word + ", " + aWord);
    }
    else {
        console.log(sentence);
    }
}
printSomething("我是一段信息");
printSomething("派大星", "我喜欢海绵宝宝", "我也喜欢你");
var db = {
    filter: function (cb) {
        var user1 = {
            admin: true
        };
        var user2 = {
            admin: false
        };
        // cb()
        return [user1, user2];
    }
};
var list = db.filter(function () {
    return this.admin;
});
console.log(list);
