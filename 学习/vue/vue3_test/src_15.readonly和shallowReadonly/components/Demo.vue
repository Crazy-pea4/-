<template>
  <div class="con">
    <h2>总和：{{ sum }}</h2>
    <button @click="sum++">+1</button>
    <h2>{{ person }}</h2>
    <h2>姓名：{{ name }}</h2>
    <button @click="name += '!'">点我修改名字</button>
    <h2>年龄：{{ age }}</h2>
    <button @click="age++">点我修改年龄</button>
    <h2>薪水：{{ shenzhen.tencent.salary }}k</h2>
    <button @click="shenzhen.tencent.salary++">点我修改年龄</button>
  </div>
</template>

<script>
import { ref, reactive, toRefs, readonly, shallowReadonly } from "vue";
export default {
  name: "Demo",
  setup() {
    let sum = ref(0);
    let person = reactive({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });

    // readonly：深层只读
    // person = readonly(person);
    // shallowReadOnly：浅层只读
    person = shallowReadonly(person);

    return {
      person,
      ...toRefs(person),
      sum,
    };
  },
};
</script>

<style>
</style>