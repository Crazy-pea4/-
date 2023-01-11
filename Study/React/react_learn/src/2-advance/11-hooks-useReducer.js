import React, { createContext, useReducer, useContext } from "react";

const GlobalContext = createContext();

/**
 * useReducer是useState的替代方案，如果某些需求用useState不好完成，可以选择使用useReducer
 * 它经常与createContext一起搭配使用
 *    -第一个参数是reducer函数，其接收两个参数(state, action)。该函数需要返回一个新对象作为新的state，直接更改旧的state是错误的
 *    -第二个参数是initialState也就是state默认值，是一个对象
 *
 *    它返回一个数组，解构后[state, dispatch]，其中dispatch函数是修改state的唯一函数
 *      -dispatch函数传入的参数可以在reducer第二个参数(action)访问
 *
 */

const reducer = (state, action) => {
  switch (action.type) {
    case "change-child2":
      return { ...state, child2: state.child2 + action.value };
    case "change-child3":
      return { ...state, child3: state.child3 + action.value };

    default:
      return state;
  }
};

const ChildState = {
  child2: 0,
  child3: 0,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, ChildState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div>
        <Child1></Child1>
        <Child2></Child2>
        <Child3></Child3>
      </div>
    </GlobalContext.Provider>
  );
}

function Child1() {
  const { dispatch } = useContext(GlobalContext);
  return (
    <div>
      <span>我是child1</span>
      <button
        onClick={() => {
          dispatch({
            type: "change-child2",
            value: 2,
          });
        }}
      >
        修改child2
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "change-child3",
            value: 5,
          });
        }}
      >
        修改child3
      </button>
    </div>
  );
}

function Child2() {
  const { state } = useContext(GlobalContext);
  return (
    <div>
      <span>我是child2-{state.child2}</span>
      <span></span>
    </div>
  );
}

function Child3() {
  const { state } = useContext(GlobalContext);
  return (
    <div>
      <span>我是child3-{state.child3}</span>
      <span></span>
    </div>
  );
}
