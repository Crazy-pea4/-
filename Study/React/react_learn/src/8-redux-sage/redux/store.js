import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "./saga";

const initState = {
  list: [],
};

const reducer = function (state = initState, action) {
  const { value, type } = action;
  switch (type) {
    case "toReduxAction_plus":
      state.list.push(...value);
      const list = state.list;
      return { ...state, list };

    default:
      return { ...state };
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// redux-saga
const SagaMiddleWare = createSagaMiddleware();

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(SagaMiddleWare))
);

SagaMiddleWare.run(Saga);
