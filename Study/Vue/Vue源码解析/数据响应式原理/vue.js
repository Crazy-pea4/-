class Vue {
  $data = {};
  $el;
  constructor(obj) {
    this.$data = obj.data || {};
    this.$el = document.querySelector(obj.el);
    // 数据劫持
    Observer(this.$data);
    // HTML模板解析
    Compile(this);
  }
}

// 数据劫持
function Observer(data) {
  if (typeof data !== "object") return;
  // 创建Dep实例
  const dep = new Dep();
  Object.keys(data).forEach((key) => {
    let value = data[key];
    // 递归劫持对象的子属性
    Observer(value);
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        console.log(`访问了属性：${key}, 属性值：${value}`);
        Dep.temp && dep.addSub(Dep.temp);
        return value;
      },
      set(newVal) {
        console.log(`属性：${key}属性值：${value}修改为 ${newVal}`);
        value = newVal;
        Observer(newVal);
        dep.notify();
      },
    });
  });
}

// HTML模板解析
function Compile(vm) {
  // 创建文档碎片
  const fragment = document.createDocumentFragment();
  let child;
  while ((child = vm.$el.firstChild)) {
    // append会删除原来在nodeList中的node，当获取不到firstChild就会停止循环
    fragment.append(child);
  }
  console.log(fragment);
  fragmentParse(fragment, vm);

  // 将替换好内容的文档碎片添加到绑定的节点上
  vm.$el.appendChild(fragment);
}

function fragmentParse(fragment, vm) {
  let reg = /\{\{\s*(\S+)\s*\}\}/;
  // 文字节点类型是3
  if (fragment.nodeType === 3) {
    const nodeValue = fragment.nodeValue;
    // 匹配节点类型为3并且节点值有正则匹配值
    let matchedStr = fragment.nodeValue.match(reg);
    if (matchedStr) {
      // 由于获取到的是data下的第一层数据，若其中包含对象'info.gender'则需要处理
      const value = stringToObject(matchedStr[1], vm);
      // 将文档碎片里面的{{xxx}}替换成找到的value
      fragment.nodeValue = nodeValue.replace(reg, value);
      // console.log(fragment.nodeValue);

      // 创建订阅者（传过去的key参数是没处理之前的）
      new Watcher(vm, matchedStr[1], (newVal) => {
        fragment.nodeValue = nodeValue.replace(reg, newVal);
      });
    }
    return;
  }
  // 判断哪里使用了v-model
  if (fragment.nodeType === 1 && fragment.nodeName === "INPUT") {
    const attr = Array.from(fragment.attributes);
    attr.forEach((i) => {
      if (i.nodeName === "v-model") {
        const value = i.nodeValue.split(".").reduce((total, current) => {
          return total[current];
        }, vm.$data);
        // 将input节点的value换成计算出来的value
        fragment.value = value;
        // input数据更改也要通知视图更新
        new Watcher(vm, i.nodeValue, (newVal) => {
          fragment.value = newVal;
        });
        // 剩下的通过视图修改数据
        fragment.addEventListener("input", (e) => {
          // 直接对vm中的数据做赋值操作（vm.$data[info.gender]是不行的）
          // 触发setter，通知订阅者的update更改视图
          // ['info', 'gender']
          const arr1 = i.nodeValue.split(".");
          // ['info']
          const arr2 = arr1.slice(0, arr1.length - 1);
          // vm.$data.info
          const final = arr2.reduce((total, current) => {
            return total[current];
          }, vm.$data);
          // vm.$data.info['gender']
          final[arr1[arr1.length - 1]] = e.target.value;
        });
      }
    });
  }
  // 节点里可能还有节点
  fragment.childNodes.forEach((child) => fragmentParse(child, vm));
}

function stringToObject(str, vm) {
  const arr = str.split(".");
  const value = arr.reduce((total, current) => {
    return total[current];
  }, vm.$data);
  return value;
}

// 依赖收集
class Dep {
  temp = null;
  subscriber = [];
  constructor() {
    this.subscriber = [];
  }
  addSub(sub) {
    this.subscriber.push(sub);
  }
  notify() {
    this.subscriber.forEach((sub) => sub.update());
  }
}

// 订阅者
class Watcher {
  vm;
  key;
  callback;
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    // 临时属性 - 触发getter
    Dep.temp = this;
    // 这里又重复处理的一次的目的是触发每个属性的getter
    key.split(".").reduce((total, current) => {
      return total[current];
    }, vm.$data);
    // 因为使用defineProperty的形式劫持了数据变化
    // 因此不能直接在getter里添加订阅者到订阅者数组
    // 所以设置一把锁，只有在创建订阅者时的reduce才能把锁打开，其他时间访问属性时都不会添加到数组
    // 就需要在getter配合一下把是否有Dep.temp为前提
    Dep.temp = null;
  }
  update() {
    const value = this.key.split(".").reduce((total, current) => {
      return total[current];
    }, this.vm.$data);
    this.callback(value);
  }
}
