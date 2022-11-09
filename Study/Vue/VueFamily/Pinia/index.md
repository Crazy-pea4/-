Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

[简介 | Pinia (vuejs.org)](https://pinia.vuejs.org/zh/introduction.html)

### Store仓库的结构

```ts
import { defineStore } from "pinia";

/**
 * defineStore的第二个参数支持两种写法：options store和 setup stroe。https://pinia.vuejs.org/zh/core-concepts/#option-stores
 *  这里为了清晰结构采用options store
 */
export const useCounterStore = defineStore("counter", {
  /**
   *  state，储存全局状态，必须返回一个对象
   *  1. 必须是函数，为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   *  2. 必须是箭头函数，为了修改数据时更好的ts类型推断
   */
  state: () => ({ count: 0, arr: [0] }),
  // 类似于computed，用来封装计算属性，有缓存功能
  getters: {},
  // 类似methods
  actions: {
    changeState() {
      this.$patch((state) => {
        state.count++;
      });
    },
  },
});
```

### 修改state数据

仓库数据如上面的代码所示

```html
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useCounterStore } from "@/stores/counter"

const counterStore = useCounterStore()
// 1. 直接修改数据
const addOne = () => {
    counterStore.count++
}
// 2. 使用$patch来一次性修改多个数据，patch接受两种写法
// 第一种对象写法适合处理简单数据，当涉及到数组的增删改就比较麻烦
// 第二种函数写法适合处理带有复杂数据
/* 直接修改数据和使用$patch的不同点：直接修改会让当前的赋值语句执行完毕后
   马上通知视图更新，多个数据的修改就多次更新视图，存在效率上的问题
   而使用$patch可以将数据都修改好之后，再更新视图
*/
const addOne2 = () => {
    counterStore.$patch({
        count: counterStore.count + 1
    })
    counterStore.$patch((state) => {
        state.count++
        state.arr.push(0)
    })
}
// 使用actions中的方法
// 适合当业务逻辑多的时候，把放在actions里，然后在组件中直接调用
const addOne3 = () => {
    counterStore.changeState()
}

</script>
```

使用定义在actions的方法时还可以通过`this.$patch`来同时处理多组数据

### Getter使用手册

```ts
getters: {
    numPlusOne(state) {
      console.log("num+1了");
      return state.num + 2;
    },
   // numPlusOne(): number {
   //   return this.num + 1;
   // },
  },
```

如上面所述，getters配置项内部通过接受函数的形式来计算state数据，函数提供一个可选的`state`参数，这意味着我们可以使用形参`state`或使用`this`来修改数据。（需要注意的是，使用this时，ts无法推断函数的返回类型，需要手动指定）

在模板中使用：（数据有缓存作用，多次引用不会形成累加的效果）

```v
{{ counterStore.numPlusOne }} // 10
{{ counterStore.numPlusOne }} // 10
{{ counterStore.numPlusOne }} // 10
```

### 在组件中的使用

与组合式api思想类似，需要用到就导入。

首先要引入整个仓库，随后在里面配置的actions getters state随便调

```html
<script setup lang='ts'>
import { useCounterStore } from "@/stores/counter"

const counterStore = useCounterStore()

const addOne = () => {
    counterStore.count++
}

const addOne2 = () => {
    counterStore.$patch({
        count: counterStore.count + 1
    })
    counterStore.$patch((state) => {
        state.count++
        state.arr.push(0)
    })
}

const addOne3 = () => {
    counterStore.changeState()
}

</script>
```

### 在模板中使用

直接`counterStore.numPlusOne`即可，但如果觉得写`counterStore`比较繁琐，可以通过解构的方式，但必须使用pinia导出的**storeToRef**来保持数据响应式。

```ts
import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"

const counterStore = userCounterStore()


const { count, num } = storeToRefs(counterStore)
```

下面是错误的解构方式

```ts
const { count, num } = counterStore // 这样做会使响应式失效
```
