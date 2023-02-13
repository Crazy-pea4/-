<template>
    <ListBg class="mt-8 w-sHeart py-1 px-3 rounded-md bg-black bg-opacity-40">
        <!-- 顶部tabBar -->
        <template #head>
            <div class="flex h-10 relative">
                <div v-for="(i, index) in tabBar" :key="index"
                    class=" w-16 border-gray-300 cursor-pointer text-base flex justify-center items-center mx-2 first:ml-0 last:mr-0"
                    :class="{ 'border-b-2': $route.meta.index === index }"
                    @click="$router.replace({ name: i.routeName })">
                    {{ i.title }}
                </div>
            </div>
        </template>
        <!-- 主体内容部分 -->
        <template #body>
            <div class="mt-8 overflow-auto min-h-screen">
                <router-view></router-view>
            </div>
        </template>
    </ListBg>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import ListBg from "@/components/ListBg/index.vue"

const tabBar = [{
    title: '收藏问题',
    routeName: 'CollectedQuestion'
}, {
    title: '点赞回答',
    routeName: 'LikedAnswer'
}]
</script>

<style lang='' scoped>

</style>