// 接口的基本运用 interface
interface localtion {
  x: number;
  y: number;
}
function printLocation(o: localtion) {
  console.log(o.x, o.y);
}
// 接口与类型别名差不多，但在扩展的书写方法上有些不一样和作用范围不同
// 接口只能用对象，而类型别名可以是任意类型

// 扩展接口
interface animals {
  name: string;
}
interface dog extends animals {
  age: number;
}
const littleDog: dog = {
  name: "poggy",
  age: 1,
};
console.log(littleDog);

// 交叉扩展
type earth = {
  land: string;
  sea: string;
};
type mars = earth & {
    moutains: string
}
const planet: mars = {
    land: '中国',
    sea: '南海',
    moutains: '奥林匹克山'
}
console.log(planet);

// 两者添加字段的区别
interface my1 {
  name: string;
}
interface my1 {
  age: number;
}
// 可以看到，interface可以重复的添加字段
const me1: my1 = {
  name: '叶悟熙',
  age: 10
}

// 可以看到，type的类型别名就不可以重复使用，只能使用上面的交叉扩展去添加字段
type my2 = {
  name: string
}
type my2 {
  age: number
}
