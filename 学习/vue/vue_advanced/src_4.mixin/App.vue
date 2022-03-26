<template>
  <div>
    <!-- 可以用v-bind添加到属性上，来其的属性值经过js解析，就不必是String类型 -->
    <h1>欢迎来到Vue</h1>
    <Student></Student>
    <Person></Person>
  </div>
</template>

<script>
// 引入文件
import Student from "./components/Student.vue";
import Person from "./components/Person.vue";
export default {
  name: "App",
  components: {
    Student,
    Person,
  },
};
</script>
