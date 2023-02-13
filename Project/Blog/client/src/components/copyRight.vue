<template>
    <!-- 底部区域 -->
    <div class="h-20 bg-zinc-500 bg-opacity-50 flex flex-col justify-center items-center mt-10"
        v-if="$route.meta.isShowCopyRight">
        <div class="">copyright yarh-blog 2022©️</div>
        <div class="">不知道这里要写什么，不过别的网站都有下面的版权介绍</div>
        <div class="">所以我在这里也占个位置</div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<style lang='' scoped>

</style>