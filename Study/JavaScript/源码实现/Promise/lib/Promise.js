/**
 * Promise模块（es5）
 * 函数自调用：IIFE
 */

(function () {
  // Promise构造函数
  function Promise(executor) {
    /**
     *  status: 初始的promise状态
     *  data: 用于存储结果数据
     *  callback: 每个元素的结构 --- { onFulfilled() {}, onRejected() {} }
     */
    let _this = this;
    this.status = "pending";
    this.data = undefined;
    this.callbacks = [];

    function resolve(value) {
      if (_this.status !== "pending") return;
      /**
       *  将状态改为fulfilled
       *  保存value数据
       *  如果有待执行的callback函数（先指定回调后改变状态的情况），立即异步执行回调
       */
      _this.status = "fulfilled";
      _this.data = value;
      if (_this.callbacks.length > 0) {
        // 情况：先指定回调再改变状态
        setTimeout(() => {
          _this.callbacks.forEach((callbackObj) => {
            callbackObj.onFulfilled(value);
          });
        });
      }
    }
    function reject(reason) {
      if (_this.status !== "pending") return;
      _this.status = "rejected";
      _this.data = reason;
      if (_this.callbacks.length > 0) {
        setTimeout(() => {
          _this.callbacks.forEach((callbackObj) => {
            callbackObj.onRejected(reason);
          });
        });
      }
    }

    // 立即同步执行executor。抛出异常也要捕获并且改状态为rejected
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // Promise.prototype.then
  Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // 指定默认的then失败回调
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            // 实现异常穿透的关键
            throw reason;
          };

    let _this = this;
    //  返回一个新Promise对象
    return new Promise(function (resolve, reject) {
      /**
       *  太多地方需要用到处理结果的代码，把它封装成函数
       */
      function handleResult(callback) {
        /**
         *  传入的成功回调的3种情况；
         *    1. 回调抛出异常，返回的新Promise状态为rejected
         *    2. 回调返回值非Promise，返回的新Promise状态为fulfilled
         *    3. 回调返回值为Promise，返回的新Promise状态为这个Promise的结果
         */
        try {
          let result = null;
          if (callback.isFinally) {
            result = callback();
          } else {
            result = callback(_this.data);
          }
          // 若返回值是一个Promise
          if (result instanceof Promise) {
            // 传入的Promise利用其then方法查看其状态
            // onFulfilled和onRejected位置上就是要返回的Promise的resolve和reject
            result.then(resolve, reject);
          } else {
            if (callback.isFinally) {
              resolve();
            } else {
              resolve(result);
            }
          }
        } catch (error) {
          reject(error);
        }
      }

      // 由上一个then中成功/失败的回调中的情况决定调用resolve/reject
      if (_this.status === "fulfilled") {
        // 若状态以及改变，则异步执行回调
        setTimeout(() => {
          handleResult(onFulfilled);
        });
      } else if (_this.status === "rejected") {
        setTimeout(() => {
          handleResult(onRejected);
        });
      } else {
        /**
         *  若当前状态还是pending状态，将回调函数存起来，
         *  由于在上面resolve和reject方法里遍历调用的是 名字为 onFulfilled和onRejected的函数
         *  所以往callbacks里追加的对象中方法为onFulfilled（这个与then方法接受的参数无关），
         *  然后在方法体中调用then方法接收的参数，也就是onFulfilled。
         *  因为同名，要注意区分二者的区别
         */
        _this.callbacks.push({
          onFulfilled: function () {
            handleResult(onFulfilled);
          },
          onRejected: function () {
            handleResult(onRejected);
          },
        });
      }
    });
  };

  // Promise.prototype.catch
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  // 实现finally方法，自己实现的
  Promise.prototype.finally = function (onFinally) {
    /**
     *  finally的回调只会处理抛出的异常和Promise.reject(params)
     *    - 也就是说finally后面.then的回调函数是不会接收任何参数的（但仍会执行）
     */
    onFinally.isFinally = true;
    return this.then(onFinally, onFinally);
  };

  // Promise.resolve
  Promise.resolve = function (value) {
    // 返回一个成功/失败的promise
    return new Promise(function (resolve, reject) {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  // Promise.reject
  Promise.reject = function (reason) {
    // 返回一个失败的Promise
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  };

  // Promise.all
  Promise.all = function (promiseArr) {
    // 创建保存每个promise返回结果的数组
    let values = [];
    let count = 0;
    return new Promise(function (resolve, reject) {
      promiseArr.forEach((p, index) => {
        // 数组中可能有元素不是Promise，那就统一包装成Promise
        Promise.resolve(p).then(function (value) {
          count++;
          // 因为forEach的回调时异步执行，放在values数组里面的顺序要与传进来的promiseArr顺序一致
          values[index] = value;

          /**
           *  这里不能直接比较value.length===promiseArr.length
           *  如果[p1, p2, p3]中p2如果异步执行时间比p3长，那么拿到的values数组可能会出现p2为empty的情况
           *      - 这是因为还没等待p2执行完毕就已经将values输出了，注意！！此时数组的长度仍为3 [p1, empty, p3]，会提前执行if语句
           *        若尝试打印出values会发现在执行完毕之前打开数组里面会缺少p2，在执行完毕之后打开数组p2就会出现（但控制台不是动态的）
           */
          if (count === promiseArr.length) {
            resolve(values);
          }
        }, reject);
      });
    });
  };

  // Promise.race
  Promise.race = function (promiseArr) {
    // 创建保存每个promise返回结果的数组
    return new Promise(function (resolve, reject) {
      promiseArr.forEach((p, index) => {
        // 这里不用担心后面的会把前面的resolve覆盖掉，因为状态只能改一次
        Promise.resolve(p).then(resolve, reject);
      });
    });
  };

  // 向外暴露Promise
  window.Promise = Promise;
})();
