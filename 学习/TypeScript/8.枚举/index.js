"use strict";
// 枚举的基本用法：
var point;
(function (point) {
    point[point["x"] = 1] = "x";
    point[point["y"] = 2] = "y";
    point[point["z"] = 3] = "z";
})(point || (point = {}));
// 运行一下生成的js文件就会看到point.y、point.z也给自动赋值了，
console.log(point.x);
console.log(point.y);
console.log(point.z);
