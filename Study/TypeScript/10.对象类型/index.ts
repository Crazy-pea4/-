/**
 * 索引签名 -值必须是string, number, symbol或模板文本类型
 *  一般来说:
 *      - 对数组的使用，其索引签名就是number
 *      - 对对象的使用，其索引签名就是string
 *
 *      索引签名就是来扩展对象属性的，允许我们添加额外的属性但必须遵守索引签名的格式
 * */
interface StringArr {
  [index: number]: string;
}
// 数组的使用
const arr: StringArr = ["a", "b"];

interface Obj {
  [key: string]: string;
}
// 对象的使用
const obj: Obj = {
  123: "123",
};

// 作为对象属性的拓展
interface MoreProps {
  [prop: string]: string | number | string[];
  name: string;
  age: number;
}
const person: MoreProps = {
  name: "John",
  age: 22,
  // 下面是拓展部分
  skill: ["唱", "跳", "rap", "篮球"],
  localtion: "美国校队",
  eyes: 2,
};

/**
 *  交叉类型
 *
 */

interface Inter1 {
  name: string;
}
interface Inter2 {
  age: number;
}

type Person = Inter1 & Inter2;

const jack: Person = {
  name: "Jack",
  age: 20,
};

/**
 *  泛型对象类型
 *    - 根据用户自己传进来的值去限制类型
 */

interface Car<Name, Color> {
  name: Name;
  color: Color;
}
// 泛型对象需要手动指定传递的类型
const bmw: Car<string, string> = {
  name: "",
  color: "",
};
