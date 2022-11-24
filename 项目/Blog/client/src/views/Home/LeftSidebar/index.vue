<template>
    <!-- 上下箭头 -->
    <div class="w-full h-5 border-2 border-b-0 flex justify-center items-center cursor-pointer z-10"
        @click="changeShow">
        <up-outlined class="duration-300" :class="{ '-rotate-180': isShow }" />
    </div>
    <!-- 功能小图标 -->
    <div class="w-full border-2 flex flex-col overflow-hidden justify-center duration-300 items-center cursor-pointer"
        :class="{ 'h-0': !isShow, 'h-16': isShow }">
        <edit-outlined @click="ToWrite" class="text-4xl" />
        <span>新增问题</span>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'
import { EditOutlined, UpOutlined } from '@ant-design/icons-vue';

const router = useRouter()

const isShow = ref(true)
const changeShow = () => {
    isShow.value = !isShow.value
}

const ToWrite = () => {
    router.push({ name: "Write" })
}


</script>

<style lang='' scoped>

</style>