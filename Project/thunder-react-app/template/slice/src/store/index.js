export default function () {
  return `import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export default store;`;
}
