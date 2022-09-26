import Dep from "./Dep";
import observe from "./observe";

export default function defineReactive(data, key) {
  const dep = new Dep();
  let val = data[key];

  /**
   * 整个函数调用链是循环的
   *    1：一开始目标对象进入observe函数
   *    2：随后进入new Obeserver类中，在这里给目标对象添加一个不可枚举的__ob__属性，其值为Observe类
   *    3：添加完毕后，随即调用类中的walk遍历函数将第一层的key拿到，并将目标对象和key传入defineReactive函数中
   *    4：在defineReactive函数中
   */
  let ChilOb = observe(val);
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      console.log("当前正在访问" + key + "属性");
      // 若处于依赖收集阶段
      if (Dep.target) {
        dep.depend();
        if (ChilOb) {
          ChilOb.dep.depend();
        }
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      console.log("当前正在修改" + key + "属性，新值为" + newVal);
      val = newVal;
      // 对要赋新的值也进行一次observe，因为新值可能为一个对象
      ChilOb = observe(newVal);
      // if (Dep.target) {
      dep.notify();
      // }
    },
  });
}
