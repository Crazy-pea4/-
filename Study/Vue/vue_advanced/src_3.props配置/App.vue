<template>
  <div>
    <!-- 可以用v-bind添加到属性上，来其的属性值经过js解析，就不必是String类型 -->
    <Student name="叶萌" :age="19"></Student>
    <Student name="张三" :age="35"></Student>
    <Student name="孙悟空"></Student>
  </div>
</template>

<script>
// 引入文件
import Student from "./components/Student.vue";
export default {
  name: "App",
  components: {
    Student,
  },
};
</script>
