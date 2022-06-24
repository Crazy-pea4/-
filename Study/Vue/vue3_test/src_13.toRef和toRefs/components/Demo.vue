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

    // 为了不在html模板中重复使用person.的形式，Vue3提供了toRef(targetObj: Object, key: String)
    // const name = toRef(person, "name");
    // const age = toRef(person, "age");
    // const salary = toRef(person.shenzhen.tencent, "salary");
    // 那我们为何不在return中直接name: ref(person.name)呢
    // 这是因为ref(person.name)创建出来的是一个新的ref对象，与原来的name已经不存在联系了

    // 隆重介绍toRefs，可以直接把一个响应式对象的所有属性都换成ref对象，这样都不用写person.了
    // 但是toRefs只能转换第一层数据，更深层的数据仍然需要手动写上
    const x = toRefs(person);
    console.log(x);

    return {
      person,
      // name: toRef(person, "name"),
      // age: toRef(person, "age"),
      // salary: toRef(person.shenzhen.tencent, "salary"),

      // 配合...运算符
      ...toRefs(person),
    };
  },
};
</script>

<style>
</style>