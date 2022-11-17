<template>
    <div class="">
        <!-- 顶部 -->
        <header class="w-full h-96 relative bg-slate-600">
            <news />
        </header>
        <!-- 主体部分 -->
        <div class="flex justify-center mt-8">
            <!-- 左侧边栏 -->
            <div class="w-64">
                aaaa
            </div>
            <!-- 问题记录列表 -->
            <div class="float-left w-1/2 h-auto relative mb-24 p-5 border-2 rounded-md transform">
                <mainFloor></mainFloor>
            </div>
            <!-- 右侧边栏 -->
            <div class="float-left relative ml-4">
                <div>今天是：{{ new Date() }}</div>
                <!-- 日历 -->
                <calendar />
                <!-- ip显示 -->
                <ip />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import mainFloor from './mainFloor/index.vue'
import calendar from './calendar/index.vue'
import ip from './ip/index.vue'
import news from './news/index.vue'

</script>

<style lang='css' scoped>

</style>