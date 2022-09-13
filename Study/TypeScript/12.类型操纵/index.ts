/**
 *  1. keyof操作符 ————用来定义一个类型属于另一个类型的key
 */

type Person1 = { name: string; age: number };
type NameOrAge = keyof Person1; // 'name' | 'age'
const p1: NameOrAge = "name";
const p2: NameOrAge = "age";
// const err: NameOrAge = 'x'        // 报错

/**
 *  2. typeof操作符 ————用来返回一个类型（不可以当成值使用）
 */

let s = "hello";
let t: typeof s = "typescript";
type str1 = typeof s;

/**
 *  3. ReturnType<T> ————获取函数返回值类型，传入的泛型T必须是一个类型函数
 */
type returnStr = (p: unknown) => boolean;
// 这里返回boolean类型，不能当成值使用
type str2 = ReturnType<returnStr>;

/**
 *  4. 索引访问类型
 */

interface Person2 {
  name: string;
  age: number;
  isEaten: boolean;
}

// 通过字面量的索引访问 type I1 = "string" | "number"
type I1 = Person2["name" | "age"];
const i11: I1 = "超人";
const i12: I1 = 23;
// const i13: I1 = true; // 报错

// 通过keyof的索引访问 type I2 = "string" | "number" | "boolean"
type I2 = Person2[keyof Person2];
const i21: I2 = "海绵宝宝";
const i22: I2 = 15;
const i23: I2 = true;

// 通过类型索引访问
const array = [
  { name: "John", age: 18 },
  { name: "lucy", age: 24 },
  { name: "mikey", age: 34 },
];
// 这里必须是array[number]，因为数组的索引签名类型就是number
type OneOfThose = typeof array[number];
let x: OneOfThose = {
  name: "John",
  age: 18,
};

type Age1 = typeof array[number]["age"];
let age1: Age1 = 10;
// Or
type Age2 = OneOfThose["age"];
let age2: Age2 = 23;

/**
 *  5. 条件类型
 *    - SomeType extends OtherType ? TrueType : FalseType
 */

/**********************************例一***************************************** */
interface NoThings {
  noMass: boolean;
}
interface Thing {
  mass: number;
}
interface Car extends Thing {
  color: string;
}

type exm1 = Car extends Thing ? string : number; // type exm1 = string;
type exm2 = Car extends NoThings ? string : number; // type exm2 = number;
/**************************************例二************************************* */
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type GetType1 = MessageOf<Email>;
let Type1: GetType1 = ""; // type string

type GetType2 = MessageOf<Dog>;
let Type2: GetType2 = "err" as never; // type never

/**************************************例三************************************* */
type StrOrNum<T extends string | number> = T extends number ? Thing : NoThings;
function someFn<T extends string | number>(matter: T): StrOrNum<T> {
  throw "";
}

let a = someFn("ts"); // type a = NoThings
let b = someFn(123); // type b = Thing
