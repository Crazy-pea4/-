/**
 * redux-saga 专门处理异步action
 */

import { all } from "redux-saga/effects";

import saga1 from "./saga/saga1";

function* saga() {
  // 多页面运用saga时
  yield all([saga1()]);
}

export default saga;
