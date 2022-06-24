<template>
  <div class="con">
    <h2>x：{{x.a}}</h2>
    <button @click="x.a++">点我</button>
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
import { ref, reactive, toRef, toRefs, shallowReactive, shallowRef } from "vue";
export default {
  name: "Demo",
  setup() {
    /*
      shallow意为浅层的：
          shallowReactive指只对第一层数据做响应式处理
          shallowRef只处理基本数据类型，对于对象类型不像ref一样会求助reactive
    */
    let person = shallowReactive({
      name: "李四",
      age: 35,
      shenzhen: {
        tencent: {
          salary: 15,
        },
      },
    });

    // let x = shallowRef(6);
    let x = shallowRef({
      a: 6,
    });


    return {
      person,
      ...toRefs(person),
      x
    };
  },
};
</script>

<style>
</style>