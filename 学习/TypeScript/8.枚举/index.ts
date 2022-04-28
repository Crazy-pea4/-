// 枚举的基本用法：
enum point {
    x = 1,
    y,
    z
}
// 运行一下生成的js文件就会看到point.y也给自动赋值了，
console.log(point.x);
console.log(point.y);
console.log(point.z);
