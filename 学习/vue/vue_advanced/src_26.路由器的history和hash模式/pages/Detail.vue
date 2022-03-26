<template>
  <ul>
    <!-- 接收params参数 -->
    <li>消息编号：{{ this.$route.params.id }}</li>
    <li>消息：{{ this.$route.params.name }}</li>
    <li>消息：{{ id }}</li>
    <li>消息：{{ name }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
  // 第一种props写法接收
  // props: ["a", "b"],
  // 第二种props写法接收（只收params参数）
  props: ["id", "name"],
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