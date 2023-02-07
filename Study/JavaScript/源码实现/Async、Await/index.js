/**
 * 核心：generator生成器
 */

// 模拟异步
function fetchData(p) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}
// 生成器函数
function* generator() {
  const data1 = yield fetchData("default");
  const data2 = yield fetchData(data1);
}
// 将生成器转换成async
function generatorToAsync(fn) {
  // async修饰的函数
  return new Promise((resolve, reject) => {
    // generator函数不能().next()调用，必须用变量先存着
    const g = fn();
    let data;
    function next(res) {
      const result = g.next(res);
      if (result.done) {
        resolve(data);
        return;
      }
      result.value.then((res) => {
        data = res;
        next(res);
      });
    }
    next();
  });
}

const asyncFn = generatorToAsync(generator);
console.log(performance.now());
asyncFn.then((res) => {
  console.log(res);
  console.log(performance.now());
});
