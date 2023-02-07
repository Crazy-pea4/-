import React from "react";
import { connect } from "react-redux";

import store from "./redux/store";

function App(props) {
  const { list } = props.store;
  console.log(props);
  return (
    <div>
      <button
        onClick={() => {
          store.dispatch({ type: "toSagaAction_plus" });
        }}
      >
        点我加载列表
      </button>
      <ul>
        {list.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

// react-redux
export default connect((store) => ({
  store,
}))(App);
