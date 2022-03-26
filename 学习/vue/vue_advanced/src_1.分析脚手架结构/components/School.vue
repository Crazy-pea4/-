<template>
  <!-- html -->
  <div class="school">
    <h2>大学：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <Stduent></Stduent>
  </div>
</template>

<script>
// JavaScript
import Stduent from "./Student.vue";
export default {
  name: "School",
  data() {
    return {
      name: "广东海洋大学",
      address: "广东省湛江市麻章区",
    };
  },
  components: {
    Stduent
  }
};
</script>

<style>
/* CSS */
.school {
  background-clip: purple;
}
</style>
