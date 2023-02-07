/**
 * redux-saga 专门处理异步action
 */

import { take, fork, put, call, takeEvery } from "redux-saga/effects";

function* watchSaga1() {
  //   while (true) {
  //     // 1. take 监听 组件发来的action
  //     yield take("toSagaAction_plus");
  //     // 2. fork 同步执行异步处理函数
  //     yield fork(getList);
  //   }
  yield takeEvery("toSagaAction_plus", getList);
}

function* getList() {
  // 异步处理
  // 3. call函数发异步请求
  const res = yield call(getListAction, 666); // 第二个参数是给函数传值
  // 4. pull函数发新的action给redux，相当于做了个桥梁
  yield put({
    type: "toReduxAction_plus",
    value: res,
  });
}

function getListAction(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "我是传入的参数"]);
    }, 1000);
  });
}

export default watchSaga1;
