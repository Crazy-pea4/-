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
import { ref, watch } from "vue";
export default {
  name: "Demo",
  setup() {
    let sum = ref(0);
    let dialog = ref("你好鸭");
    let person = ref({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });

    // watch监测ref普通数据类型
    watch([sum, dialog], (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    // watch监测ref对象数据类型
    watch(person.value, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    });
    // 同时也可以用开启深度监视
    watch(person, (newValue, oldValue) => {
      console.log(newValue, oldValue);
    }, {deep: true});

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