<template>
    <div class="">
        <!-- 顶部 -->
        <header class="w-full h-80 md:h-96 2xl:h-120 relative bg-slate-600">
            <News />
        </header>
        <!-- 主体部分 -->
        <div class="flex justify-center mt-8">
            <!-- 左侧边栏 -->
            <div class="w-16 flex flex-col items-center ml-52">
                <LeftSideBar />
            </div>
            <!-- 问题记录列表 -->
            <div class="float-left w-1/2 h-auto relative p-5 border-2 rounded-md transform justify-items-end">
                <MainFloor />
            </div>
            <!-- 右侧边栏 -->
            <div class="float-left relative ml-4">
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