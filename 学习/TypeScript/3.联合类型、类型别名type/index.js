"use strict";
// 联合类型
function printId(id) {
    console.log(id);
    // 若需要调用某一类型才有的方法，则需要分支（if）
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
}
printId(1);
printId("a");
function livePlace(o) {
    console.log("你好，我是：" + o.name + "。我住在" + o.home);
}
livePlace({
    name: "吴亦凡",
    home: "共产主义房屋",
});
