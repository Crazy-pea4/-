<template>
  <ul>
    <!-- 接收params参数 -->
    <li>消息编号：{{this.$route.params.id}}</li>
    <li>消息：{{this.$route.params.name}}</li>
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