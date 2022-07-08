/**
 *    可以看到，在写Res接口前，res的类型被ts判定为unknown。
 *    为了解决这个问题，我们得给Promise固定一个泛型，这个泛型用接口Res实现
 */
var p = new Promise(function (resolve, reject) {
    resolve({
        code: 200,
        data: [
            { a: 12, b: 56 },
            { a: 75, c: 98 },
        ],
        message: ""
    });
}).then(function (res) {
    if (res.code === 200) {
        res.data.forEach(function (element) {
            console.log(element);
        });
    }
});
