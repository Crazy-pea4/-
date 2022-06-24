<template>
  <div class="con">
    姓：
    <input type="text" v-model="person.firstName" /><br />
    名：
    <input type="text" v-model="person.lastName" />
    <div>全名：{{ person.fullName }}</div>
    全名：<input type="text" v-model="person.fullName" />
  </div>
</template>

<script>
// Vue3中需要手动引入computed
import { reactive, computed } from "vue";
export default {
  name: "Demo",
  setup() {
    let person = reactive({
      firstName: "张",
      lastName: "三",
      fullName: "",
    });

    // 计算属性——简写（fullName是只读的，若修改fullName会警告）
    // person.fullName = computed(() => {
    //   return person.firstName + "" + person.lastName;
    // });

    // 计算属性——完整版（与Vue2类似，是个对象）
    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName;
      },
      set(value) {
        console.log(value);
        const newArr = value.split("-");
        person.firstName = newArr[0];
        person.lastName = newArr[1];
      },
    });

    return {
      person,
    };
  },
};
</script>

<style>
</style>