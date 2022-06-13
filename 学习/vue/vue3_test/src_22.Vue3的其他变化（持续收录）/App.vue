<template>
  <div class="app">
    <h3 ref="refElement">App组件</h3>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "App",
  setup() {
    // 在Vue3中使用ref来获取元素有别于Vue2，最根本的原因是this为undefined
    // Vue3中需要在setup函数里定义一个ref对象，其名与写在元素中ref属性一直，并返回出去。这样Vue3就会匹配到同名的ref且返回该元素(真实DOM)到ref.value上
    let refElement = ref(null);
    console.log("我还没挂载", refElement.value);
    onMounted(() => {
      // 当然得等到元素挂载完毕才能获取到
      console.log("已经挂载完毕", refElement.value);
    });

    return {
      refElement,
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