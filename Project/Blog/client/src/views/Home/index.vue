<template>
    <div class="bg-zinc-100">
        <!-- 顶部 -->
        <header class="w-full h-80 md:h-96 2xl:h-120 relative bg-slate-600">
            <News />
        </header>
        <!-- 主体部分 -->
        <div class="flex justify-center mt-8 mx-4">
            <!-- 左侧边栏 -->
            <div class="w-16 ml-52">
                <LeftSideBar />
            </div>
            <!-- 问题记录列表 -->
            <div class="w-1/2 relative transform border-2 p-4 rounded-md justify-items-end bg-white">
                <MainFloor />
            </div>
            <!-- 右侧边栏 -->
            <div class="relative ml-4">
                <RightSideBar />
            </div>
        </div>
        <footer></footer>
    </div>
</template>

<script setup lang='ts'>
import MainFloor from './MainFloor/index.vue'
import News from './News/index.vue'
import LeftSideBar from './LeftSidebar/index.vue'
import RightSideBar from './RightSidebar/index.vue'

</script>

<style lang='css' scoped>

</style>