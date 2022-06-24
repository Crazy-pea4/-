<template>
  <div>
    <h1>欢迎来到Vue</h1>
    <Person></Person>
  </div>
</template>

<script>
// 引入文件
import Person from "./components/Person.vue";
export default {
  name: "App",
  components: {
    Person,
  },
};
</script>
