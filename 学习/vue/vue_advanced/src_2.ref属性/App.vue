<template>
  <div>
    <h1 ref="h1">欢迎来到Vue</h1>
    <School ref="school" id="school"></School>
    <button @click="showDOM">点我在控制台输出上方的标签</button>
  </div>
</template>

<script>
// 引入文件
import School from "./components/School.vue";
export default {
  name: "App",
  components: {
    School,
  },
  methods: {
    showDOM() {
      // vm vc中都有一个$refs属性，里面有在自身组件中添加了ref属性的标签（常规DOM、组件标签）
      console.log(this.$refs.h1);
      // 通过ref属性可以获取到vc，也就是组件实例对象
      console.log(this.$refs.school);
      // 若通过id获取组件标签，就会发现只输出了School组件里面的html结构
      console.log(document.getElementById("school"));
    },
  },
};
</script>

<style></style>
