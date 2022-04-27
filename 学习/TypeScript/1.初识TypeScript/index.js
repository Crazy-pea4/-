console.log('hello TS');
var test = function (p1, p2) {
    console.log("I am ".concat(p1, ", and I want ").concat(p2));
};
test('光头强', '发财');
// 如何运行.ts文件
// 1. 需要在该ts文件的根目录运行终端，并且输入 tsc 目标文件名.ts (typescript compile)
// 2. 在根目录下会出现相同的文件名的.js文件，此时再在终端运行node 目标文件名.js 即可
// 可以看到，在不加下面代码的时候上面两个形参是报错的，这是因为我们没有指定一个显示类型
// 格式：function (p1: string, p2: string) { ... }
// 在冒号后面指定一个类型
// 优化编译
// tsc --init                               #生成配置文件
// tsc --watch 目标文件名.ts                #自动编译
// tsc -noEmitOnError 目标文件名.ts         #有错误时不编译
