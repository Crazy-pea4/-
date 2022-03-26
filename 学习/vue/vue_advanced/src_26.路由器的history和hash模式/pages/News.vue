<template>
  <ul>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
    <li>
      <a href="">我爱你</a>
      <input type="text" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "News",
  beforeDestroy() {
    console.log("News组件将被销毁");
  },
};
</script>

<style scoped>
ul li {
  float: left;
  width: 327px;
  height: 30px;
  line-height: 30px;
}
</style>