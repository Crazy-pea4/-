<template>
  <div class="con">
    <h2>总和：{{ sum }}</h2>
    <button @click="sum++">点我加一</button>
  </div>
</template>

<script>
// 使用时需要引入
import { ref, onMounted, onUpdated } from "vue";
export default {
  name: "Demo",
  // 组合式API形式的生命周期钩子————格式：on + 配置项形式钩子
  setup() {
    let sum = ref(0);

    onMounted(() => {
      console.log('我是组合式API形式的生命周期钩子onMounted');
    });
    onUpdated(() => {
      console.log('我是组合式API形式的生命周期钩子onUpdated');
    });
    // 若同时写配置项和API形式的钩子，那么API形式的钩子优先执行
    return {
      sum,
    };
  },

  // 配置项形式的生命周期钩子
  //#region
  // beforeCreate() {
  //   console.log("---beforeCreate---");
  // },
  // created() {
  //   console.log("---created---");
  // },
  // beforeMount() {
  //   console.log("---beforeMount---");
  // },
  // mounted() {
  //   console.log("---mounted---");
  // },
  // beforeUpdate() {
  //   console.log("---beforeUpdate---");
  // },
  // updated() {
  //   console.log("---updated---");
  // },
  // beforeUnmount() {
  //   console.log("---beforeUnmount---");
  // },
  // unmounted() {
  //   console.log("---unmounted---");
  // },
  //#endregion
};
</script>

<style>
</style>