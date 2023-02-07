import React from "react";
import ReactDOM from "react-dom/client";
import App from "./7-mobx/App";
import { Provider } from "mobx-react";
import store from "./7-mobx/mobx-react/store";

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
