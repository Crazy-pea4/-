import Dep from "./Dep";

let uid = 0;
/**
 *  这里是对vm.$watch(target, expression, callback)的还原
 */
export default class Watch {
  constructor(target, expression, callback) {
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    this.value = this.get();
  }
  update() {
    this.run();
  }
  get() {
    /**
     *  进入依赖收集阶段，Dep.target就像是一个开关。
     *  作用是初始化Watch想要监听的数据时，读取数据的操作会在getter里面通知Dep收集依赖。
     *  将当前的Watcher类的实例（this）放入subs数组，方便在以后数据发生改变时，在setter里
     */
    Dep.target = this;
    // 在使用parsePath时也会触发get
    let result = this.getter(this.target);
    Dep.target = null;

    return result;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const newVal = this.get();
    // 如果后续要watch的数据更改了
    if (newVal !== this.value) {
      const oldVal = this.value;
      this.value = newVal;
      cb.call(this.target, newVal, oldVal);
    }
  }
}

function parsePath(path) {
  if (!path.includes(".")) return;
  let arr = path.split(".");
  return (obj) => {
    for (const i of arr) {
      obj = obj[i];
    }
    return obj;
  };
}
