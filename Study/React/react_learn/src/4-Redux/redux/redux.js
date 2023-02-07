/**
 * 这里是redux模拟源码的过程
 */

function createMyStore(reducer) {
  const list = [];
  // 一开始执行以下reducer，它必会返回一个initState
  let state = reducer(undefined, {}); // 传入一个 {} 主要是第一次执行防止用户写出action.type类似代码，会报不能在undefine里读数据错误
  function subscribe(callback) {
    list.push(callback);
  }

  // 每次调用dispatch会触发reducer函数
  function dispatch(action) {
    // 一般来说调用dispatch会传入对象，称为action 里面就有数据
    state = reducer(state, action);
    list.forEach((i) => i());
  }

  function getState() {
    return state;
  }

  // 最后返回一个对象，里面包含上述方法
  return {
    subscribe,
    dispatch,
    getState,
  };
}
