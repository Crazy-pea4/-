<template>
  <div class="app">
    <h3>App组件</h3>
    <Child></Child>
  </div>
</template>

<script>
import Child from "./components/Child.vue";
export default {
  name: "App",
  components: {
    Child,
  },
};
</script>

<style scoped>
.app {
  padding: 10px;
  background-color: blanchedalmond;
}
</style>