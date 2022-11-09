<template>
    <!-- 列表 -->
    <div class="w-full h-auto">
        <!-- 列表中的每一项 -->
        <div class="w-full h-36 border-2 rounded-xl transition-all duration-200 flex flex-col justify-around text-center hover:shadow-lg my-5 px-5 first:mt-0 last:mb-0"
            v-for="item in questionList" :key="item._id">
            <div class="text-2xl">{{ item.title }}</div>
            <div>{{ item.descriptions }}</div>
            <!-- 提出问题的人的信息 -->
            <div class="flex justify-end items-end">
                <!-- 发起者 -->
                <div class="text-sm mr-2">{{ item.questioner.nickname }}</div>
                <!-- 发起时间 -->
                <div class="text-xs">{{ item.createdAt }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/home'
// import useAfterHandelTimeHooks from "@/hooks/useAfterHandelTimeHooks"
// 创建store实例 并响应式地解构
const counterStore = useCounterStore()
const { questionList } = storeToRefs(counterStore)
// 使用hooks
// const isShow = useAfterHandelTimeHooks(counterStore)

onMounted(() => {
    counterStore.updateQuestionList()
})





</script>

<style lang='' scoped>
</style>