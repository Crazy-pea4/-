import observe from "./observe";
import Watcher from "./watcher";
import "./array";

let obj = {
  x: {
    q: {
      j: true,
    },
  },
  y: {
    m: 15,
  },
  z: [1, 2, 3],
};
observe(obj);

console.log(obj);
// 当新值是一个普通数据类型
let normalVariety = 1;
// 当新值是一个复杂数据类型
let complexVariety = {
  b: {
    c: 6,
  },
};
obj.y.m = normalVariety;
console.log(obj.y.m);

obj.x.q.j = complexVariety;
console.log(obj.x.q.j);
// 此时修改复杂数据类型新值，发现其也实现响应式
complexVariety.b = 1;

obj.z.push(8);
console.log(obj.z.splice(0, 0, ["你好", "我是"]));
console.log(obj.z[0].push("领沃团队的前端同学")); // 可以发现新增的数组也可以实现响应式
console.log(obj.z, "---------------------");

let obj2 = {
  a: {
    b: {
      c: true,
    },
  },
};
observe(obj2);

new Watcher(obj2, "a.b.c", function (newVal, oldVal) {
  console.log(newVal, oldVal);
});
obj2.a.b.c = 123;
