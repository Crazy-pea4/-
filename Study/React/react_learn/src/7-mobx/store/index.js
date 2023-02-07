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

// /**
//  * 监听普通类型数据
//  */
// const obserNum = observable.box(10);
// // 订阅函数，自动收集依赖
// autorun(() => {
//   console.log(obserNum.get());
// });
// setTimeout(() => {
//   obserNum.set(obserNum.get() + 1);
// }, 1000);

// /**
//  * 监听复杂类型数据
//  */
// const obserObj = observable({ name: "yarh", age: 20 });
// autorun(() => {
//   console.log(obserObj.name);
// });
// setTimeout(() => {
//   obserObj.age += 1;
// }, 1000);
