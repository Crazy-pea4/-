<template>
  <div class="child">
    <h3>我是子组件Child</h3>
    {{ Promise }}
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Child",
  async setup() {
    let sum = ref(0);
    // 使用<Suspense>组件允许通过返回一个Promise的形式
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ sum });
      }, 1500);
    });
    return await p;
  },
};
</script>

<style scoped>
.child {
  padding: 10px;
  background-color: aquamarine;
}
</style>