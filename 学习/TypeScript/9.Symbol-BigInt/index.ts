// BigInt
const thing: bigint = BigInt(100);
const anotherThing: bigint = 100n;
// 可以看到，在ts配置文件中，必须将target改为es2020才能兼容BigInt

const s1 = Symbol("baby");
const s2 = Symbol("baby");
s1 === s2;
// 可以看到错误提示，
