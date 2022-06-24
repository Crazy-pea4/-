<template>
  <div class="app">
    <h3>App组件。{{ name }}----{{ price }}</h3>
    <Child :carInfo="carInfo"></Child>
  </div>
</template>

<script>
import { reactive, toRefs, provide } from "vue";
import Child from "./components/Child.vue";
export default {
  name: "App",
  components: {
    Child,
  },
  setup() {
    let carInfo = reactive({
      name: "别克",
      price: 50,
    });

    // 使用provide()
    provide("car", carInfo);

    return {
      carInfo,
      ...toRefs(carInfo),
    };
  },
};
</script>

<style scoped>
.app {
  padding: 10px;
  background-color: blanchedalmond;
}
</style>