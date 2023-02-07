function plus() {
  return {
    type: "plus",
  };
}

// redux-thunk 可以判断action的返回值，如果是正常对象则视为同步，如果是一个函数则视为异步
function asyncAction() {
  // 视为异步后，会像返回的函数传递一个dispatch参数用法与之前的一致
  return (dispatch) => {
    setTimeout(() => {
      // do things...
      dispatch({
        type: "asyncAction",
        value: Math.floor(Math.random() * 10),
      });
    }, 2000);
  };
}

// redux-promise 函数内部可以是Promise对象的形式(async await)，最后将结果返回出去
async function asyncActionPromise() {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        type: "asyncActionPromise",
        value: Math.floor(Math.random() * 10),
      });
    }, 2000);
  });

  return result;
}

export { plus, asyncAction, asyncActionPromise };
