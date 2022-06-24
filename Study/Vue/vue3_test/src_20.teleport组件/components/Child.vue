<template>
  <div class="child">
    <h3>我是子组件Child</h3>
    <Son></Son>
  </div>
</template>

<script>
import Son from "./Son.vue";
export default {
  name: "Child",
  components: {
    Son,
  },
};
</script>

<style scoped>
.child {
  padding: 10px;
  background-color: aquamarine;
}
</style>