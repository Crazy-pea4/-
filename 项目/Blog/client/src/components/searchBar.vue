<template>
    <!-- 顶部搜索栏 -->
    <div class="w-full h-14 relative bg-green-600">
        <!-- 搜索框 -->
        <div class="md:w-96 h-full flex absolute left-1/2 -translate-x-1/2 items-center">
            <input class="w-full h-8 outline-none rounded-lg pl-2 text-sm" type="text">
        </div>
        <!-- 右侧用户相关部分 -->
        <div class="md:w-48 h-full flex flex-row-reverse justify-around items-center absolute right-0 mx-4">
            <div><a href="" class="p-3 text-center bg-cyan-500">个人</a></div>
            <div><a href="" class="p-3 text-center bg-red-500">收藏</a></div>
            <div><a href="" class="p-3 text-center bg-green-500">关注</a></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<style lang='css' scoped>

</style>