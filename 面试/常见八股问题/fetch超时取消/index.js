/**
 * fetch本身是不自带超时重传的，不过可以利用fetch返回promise这个特性
 */
const timeoutPromise = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("我是 timeoutPromise，已经完成了");
    }, timeout);
  });
};
const requestPromise = (url) => {
  return fetch(url);
};
Promise.race([timeoutPromise(2000), requestPromise("https://reqres.in/")])
  .then((resp) => {
    console.log(resp);
  })
  .catch((error) => {
    console.log(error);
  });
