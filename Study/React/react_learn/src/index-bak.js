import React from "react";
import ReactDOM from "react-dom/client";
import App from "./5-react-redux/App";

// 引入 react-dedux 的provider
import { Provider } from "react-redux";
import store from "./5-react-redux/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <App></App>
//   </React.StrictMode>
// );

root.render(
  <Provider store={store}>
    <App></App>
  </Provider>
);
