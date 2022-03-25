<template>
  <!-- html -->
  <div class="school">
    <h2>大学：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
// JavaScript
export default {
  name: "School",
  data() {
    return {
      name: "广东海洋大学",
      address: "广东省湛江市麻章区",
    };
  }
};
</script>

<style>
/* CSS */
.school {
  background-clip: purple;
}
</style>
