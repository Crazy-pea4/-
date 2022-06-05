<template>
  <div>
    <School></School>
    <Stduent></Stduent>
  </div>
</template>

<script>
// 引入文件
import School from "./School.vue";
import Stduent from "./Student.vue";
export default {
  name: "app",
  components: {
    School,
    Stduent,
  },
};
</script>

<style></style>
