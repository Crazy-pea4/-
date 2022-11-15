<template>
  <div class="app h-screen">
    <sidebar @getMask="getMask"></sidebar>
    <searchBar></searchBar>
    <!-- 路由组件 -->
    <div class="relative">
      <!-- 遮罩层 -->
      <div class="w-full h-screen opacity-50 bg-stone-800 fixed top-0 left-0 z-40" :class="{ 'hidden': !isMaskShow }">
      </div>
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

const isMaskShow = ref(false)

const getMask = () => {
  isMaskShow.value = !isMaskShow.value
}

</script>

<style lang='css' scoped>
.app {
  /* BFC */
  /* overflow: auto;
  background-image: url("../../../assets/flat-mountains.svg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat; */
}
</style>
