import { def } from "./utils";
import defineReactive from "./defineReactive";
import arrayMethods from "./array";
import observe from "./observe";
import Dep from "./Dep";
/**
 *  Obeserver类的目的是：将一个正常的object转换为每个层级的属性都是响应式（可以侦测到）的object
 */
export default class Observer {
  constructor(value) {
    // 每一个Observer创建出来的实例身上都有一个dep
    this.dep = new Dep();
    // 以传进来的obj为目标，在其身上添加__ob__属性，其值为当前的Observer生成的实例
    def(value, "__ob__", this, false);
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.walkButArray(value);
    } else {
      this.walk(value);
    }
  }
  // 遍历 这里是对对象的处理
  walk(value) {
    Object.keys(value).forEach((item) => {
      defineReactive(value, item);
    });
  }
  walkButArray(arr) {
    // 这里为了防止arr.length会有变化
    for (let i = 0, l = arr.length; i < l; i++) {
      // 传进的array中，也可能存在对象
      observe(arr[i]);
    }
  }
}
