<template>
    <div class="mb-10">
        <!-- 顶部 -->
        <!-- <header class="w-full h-96 md:h-120 2xl:h-130 mt-16 mb-4 relative">
            <News />
            <img src="../../../public/assets/yanquan.jpg" class="h-full ml-7">
        </header> -->
        <!-- 主体部分 -->
        <div class="flex justify-center mt-16">
            <!-- 左侧边栏 -->
            <!-- <div class="w-16 ml-52">
                <LeftSideBar />
            </div> -->
            <!-- 问题记录列表 -->
            <div class="w-9/12 min-h-screen relative transform
                 p-4 rounded-md justify-items-end bg-black bg-opacity-40">
                <MainFloor />
            </div>
            <!-- 右侧边栏 -->
            <div class="relative ml-4">
                <RightSideBar />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import MainFloor from './MainFloor/index.vue'
import LeftSideBar from './LeftSidebar/index.vue'
import RightSideBar from './RightSidebar/index.vue'

</script>

<style lang='css' scoped>

</style>