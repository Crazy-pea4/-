<template>
  <div class="con">
    <h2>总和：{{ sum }}</h2>
    <button @click="sum++">点我加一</button>
    <h2>{{ dialog }}</h2>
    <button @click="dialog += '~'">点我测试</button>
    <h2>姓名：{{ person.name }}</h2>
    <button @click="person.name += '!'">点我修改名字</button>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="person.age++">点我修改年龄</button>
    <h2>薪水：{{ person.shenzhen.tencent.salary }}k</h2>
    <button @click="person.shenzhen.tencent.salary++">点我修改年龄</button>
  </div>
</template>

<script>
// Vue3中需要手动引入watch
import { ref, watch, reactive } from "vue";
export default {
  name: "Demo",
  setup() {
    let sum = ref(0);
    let dialog = ref("你好鸭");
    let person = reactive({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });
    let arr = reactive([1, 2, 3, 4]);
    // watch(target, handler, options)

    // 情况一：监视ref定义的一个响应式数据。(目标, 函数)
    // watch(sum, (newVal, oldVal) => {
    //   console.log("sum改变", newVal, oldVal);
    // }, { immediate: true });

    // 情况二：监视ref定义的多个响应式数据。([目标1, 目标2], 函数)
    // watch([sum, dialog], (newVal, oldVal) => {
    //     console.log("dialog改变", newVal, oldVal);
    //   }, { immediate: true });

    /*
      情况三：监视reactive定义的一个响应式数据的 全部属性 (目标对象, 函数)。注意：
          1. 此处无法正确的获取到oldValue                                                     2022.6.2 Vue3.2.26
          2. 强制开启了deep: true深度监视，手动改为false也不奏效
    */
    // watch(person, (newVal, oldVal) => {
    //   console.log("person改变", newVal, oldVal);
    // }, {deeper: false});

    /*
      情况四：监视reactive定义的一个响应式数据的 某个属性 (函数=>目标属性, 函数)。
      此时发现无法监视newVal和oldVal的bug消失了
    */
    // watch(() => person.age, (newVal, oldVal) => {
    //   console.log("person.age改变", newVal, oldVal);
    // });

    /*
      情况五：监视reactive定义的一个响应式数据的 多个属性 ([函数=>目标属性1, 函数=>目标属性2], 函数)。
    */
    // watch([() => person.age, () => person.name], (newVal, oldVal) => {
    //   console.log("person.age或name改变", newVal, oldVal);
    // });

    // 特殊情况。需要deep: true开启深度监视。但此时newVal和oldVal同步的bug又出现了               2022.6.2 Vue3.2.26
    watch(
      () => person.shenzhen,
      (newVal, oldVal) => console.log("person.shenzhen改变", newVal, oldVal),
      { deep: true }
    );

    // 监视数组 ([函数=>目标属性1, 函数=>目标属性2], 函数)
    watch(
      () => [...arr],
      (newVal, oldVal) => console.log(newVal, oldVal)
    );
    arr.push(5);


    return {
      sum,
      dialog,
      person,
    };
  },
};
</script>

<style>
</style>