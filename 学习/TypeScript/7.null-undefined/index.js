"use strict";
let x = undefined;
let y = null;
// let z: string = undefined; // 默认情况下这是不行的。可以在tsconfig.json下修改"strictNullChecks": false
function some(val) {
    // 非空断言运算符 !
    console.log(val.toUpperCase());
}
