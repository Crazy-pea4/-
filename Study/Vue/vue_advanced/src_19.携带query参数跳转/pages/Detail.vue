<template>
  <ul>
    <li>消息编号：{{this.$route.query.id}}</li>
    <li>消息：{{this.$route.query.name}}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  mounted() {
    // 会发现
    console.log(this.$route);
  },
};
</script>

<style scoped>
ul li {
  margin-left: 80px;
  float: left;
  height: 30px;
}
</style>