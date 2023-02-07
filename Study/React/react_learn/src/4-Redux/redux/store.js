import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import HomeReducer from "./reducers/HomeReducer";
import CenterReducer from "./reducers/CenterReducer";

// 引入redux-thunk 支持异步action
import reduxThunk from "redux-thunk";
// 引入redux-thunk 支持异步action
import reduxPromise from "redux-promise";

/**
 * const reducer = (state, action) => {
 *    // xxx......
 * }
 */

// 使用combineReducer拆分不同页面的state
const reducer = combineReducers({
  HomeReducer,
  CenterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 第一个参数是reducer，第二个参数applyMiddleware
export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk, reduxPromise))
);
