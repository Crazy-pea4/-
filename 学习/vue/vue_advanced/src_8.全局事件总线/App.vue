<template>
  <div>
    <h1>欢迎来到Vue</h1>
    <Person></Person>
    <Student></Student>
  </div>
</template>

<script>
// 引入文件
import Person from "./components/Person.vue";
import Student from "./components/Student.vue";

export default {
  name: "App",
  components: {
    Person,
    Student
  },
};
</script>
