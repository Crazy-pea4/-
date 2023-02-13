<template>
  <div class="app bg-zinc-900 text-gray-200">
    <!-- Components组件 -->
    <topBar></topBar>
    <searchBar></searchBar>
    <backTop></backTop>
    <!-- 路由组件 -->
    <div class="relative h-full">
      <!-- 路由 -->
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
      </RouterView>
    </div>
    <copyRight></copyRight>
  </div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import searchBar from "@/components/searchBar.vue"
import topBar from "@/components/topBar.vue"
import backTop from "@/components/backTop.vue"
import copyRight from "@/components/copyRight.vue"

</script>

<style lang='css' scoped>
.app {
  /* BFC */
  overflow: auto;
  background-image: url("../../client/public/assets/background.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;

}
</style>
