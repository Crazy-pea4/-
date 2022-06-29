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
import { ref, watch, watchEffect, reactive } from "vue";
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

    // watchEffect()，在回调里面用到了哪个响应式数据，就自动监视谁'
    watchEffect(() => {
      console.log("我是watchEffect");
      // 例如这里用到了sum.value和person.shenzhen.tencent.salary，那么x1和x2分别为最新的它们的值
      let x1 = sum.value;
      let x2 = person.shenzhen.tencent.salary;
      console.log(x1, x2);
    });
    // watchEffect与computed有些类似，前者注重的是过程（没有返回值），后者注重的是结果（必须有返回值）

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