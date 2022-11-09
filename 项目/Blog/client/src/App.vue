<template>
  <sidebar></sidebar>
  <searchBar></searchBar>
  <!-- 路由组件 -->
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.isKeepAlive" :key="$route.name" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.isKeepAlive" :key="$route.name" />
  </RouterView>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router'
import searchBar from "@/components/searchBar.vue"
import sidebar from "@/components/sideBar.vue"

</script>

<style lang='' scoped>
</style>
