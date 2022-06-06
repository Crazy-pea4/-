<template>
  <div class="son">
    <h3>我是孙组件Son。{{car.name}}----{{car.price}}</h3>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: "Son",
  setup() {
    let car = inject("car");
    console.log('我是son组件', car);
    return {
      car,
    };
  },
};
</script>

<style scoped>
.son {
  padding: 10px;
  background-color: rgb(0, 139, 46) !important;
}
</style>