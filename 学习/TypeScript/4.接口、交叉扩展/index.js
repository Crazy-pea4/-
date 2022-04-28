"use strict";
function printLocation(o) {
    console.log(o.x, o.y);
}
const littleDog = {
    name: "poggy",
    age: 1,
};
console.log(littleDog);
const planet = {
    land: '中国',
    sea: '南海',
    moutains: '奥林匹克山'
};
console.log(planet);
// 可以看到，interface可以重复的添加字段
const me1 = {
    name: '叶悟熙',
    age: 10
};
