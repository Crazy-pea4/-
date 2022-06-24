<template>
  <div class="app">
    <h3>App组件</h3>
    <!-- Vue3提供了Suspense组件来配合动态引入时出现的问题 -->
    <Suspense>
      <!-- 内部是使用slot插槽原理，第一个插槽名为default，用来展现原本内容 -->
      <template v-slot:default>
        <Child></Child>
      </template>
      <!-- 第二个插槽名为fallback，用来展现当上面的原本内容还没加载出来时的替代文本 -->
      <template v-slot:fallback>
          <h3>Loading......</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
/*
  静态引入：对于一个.vue文件来说，要等这个文件里的所有依赖到的文件引入完成后才会展现

  动态引入：对于一个.vue文件来说，只要这个文件有引入完成的依赖就展现，无需等待其他依赖是否引入完成
*/
// import Child from "./components/Child.vue"; // 静态引入
// 在控制台把网速调成slow 3G来观察情况。使用动态引入可以避免“短板效应”。组件先渲染的先展现而不必等所有组件渲染完成再展现
// 也可以在Child组件里return 一个Promise
import { defineAsyncComponent } from "vue";
const Child = defineAsyncComponent(() => import("./components/Child.vue")); // 动态引入
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