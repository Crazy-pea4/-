<template>
  <div class="con">
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
import { ref, reactive, toRef, toRefs } from "vue";
export default {
  name: "Demo",
  setup() {
    let person = reactive({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });
    
    return {
      person,
      ...toRefs(person),
    };
  },
};
</script>

<style>
</style>