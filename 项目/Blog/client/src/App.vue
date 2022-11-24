<template>
  <div class="app">
    <sidebar></sidebar>
    <searchBar></searchBar>
    <!-- 路由组件 -->
    <div class="relative">
      <!-- 路由 -->
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
      </RouterView>
    </div>
  </div>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import searchBar from "@/components/searchBar.vue"
import sidebar from "@/components/sideBar.vue"


</script>

<style lang='css' scoped>
.app {
  /* BFC */
  overflow: auto;
  /* background-image: url("../../client/public/assets/home.svg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat; */

}
</style>
