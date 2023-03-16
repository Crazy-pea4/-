export default function () {
  return `import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  name: "Hello programmer!",
  age: 20,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeName(state, action) {
      state.name += action.payload;
    },
    changeAge(state) {
      state.age += 1;
    },
  },
});

export const { changeAge, changeName } = userSlice.actions;
export default userSlice.reducer;`;
}
