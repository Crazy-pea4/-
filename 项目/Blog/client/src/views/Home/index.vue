<template>
    <div>
        <!-- 问题记录列表 -->
        <div
            class="float-left w-1/2 h-auto relative left-1/2 -translate-x-1/2 mt-36 mb-24 p-5 border-2 rounded-md transform">
            <mainFloor></mainFloor>
        </div>
        <!-- 日历 -->
        <div class="float-left relative left-1/4 mt-36 ml-4">
            <calendar />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import mainFloor from './mainFloor/index.vue'
import calendar from './calendar/index.vue'

</script>

<style lang='css' scoped>

</style>