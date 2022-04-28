let x: undefined = undefined;
let y: null = null;
// let z: string = undefined; // 默认情况下这是不行的。可以在tsconfig.json下修改"strictNullChecks": false

function some(val: string | null) {
  // 非空断言运算符 !
  console.log(val!.toUpperCase());
}