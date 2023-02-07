import { action, observable, runInAction } from "mobx";

/**
 * 每次修改都通过action
 */
const store = observable(
  {
    name: "pie",
    age: 5,
    city: "pineapple",
    list: [],
    changeAge() {
      this.age += 1;
    },
    changeCity() {
      console.log(this.city);
    },
    asyncAction(res) {
      // 异步action需要调用runInAction函数
      setTimeout(() => {
        runInAction(() => {
          this.list = [...res];
        });
      }, 1000);
    },
  },
  {
    changeAge: action,
    changeCity: action,
  }
);

export default store;
