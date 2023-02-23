interface Person {
  name: string;
  age: number;
  location: string;
  work: string;
}
type Price = string | number;

// partial 使接口中所有属性变成可选
const person1: Partial<Person> = {};

// pick 选择接口中一个属性定义
const person2: Pick<Person, "location"> = {
  location: "NewYork",
};

// Pick<Person, "location" | 'name'> 选择多个属性定义

// Exclude 是操纵联合类型的
const price: Exclude<Price, string> = 123; // '123' 报错

// Omit 是操纵键值对的
const person3: Omit<Person, "name" | "location" | "age"> = {
  work: "shit",
};
