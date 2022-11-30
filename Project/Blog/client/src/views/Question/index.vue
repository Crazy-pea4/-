<template>
    <div class="bg-zinc-100 h-screen overflow-auto">
        <!-- 顶部问题标题区 -->
        <header class="w-full h-40 pt-4 bg-white shadow" v-if="question">
            <div class="w-sHeart mx-auto">
                <!-- 标题 -->
                <div class="w-full text-2xl font-medium mb-2">
                    {{ question.title }}
                </div>
                <!-- 简介（描述） -->
                <div class="w-full text-sm h-14 overflow-hidden">
                    {{ question.descriptions }}
                </div>
                <!-- 操作按钮 -->
                <div class="w-full flex rounded-md">
                    <div
                        class="w-20 h-8 bg-slate-600 rounded-md text-white flex justify-center items-center cursor-pointer">
                        收藏回答</div>
                    <div class="w-20 h-8 ml-4 border-1 flex justify-center items-center rounded-md border-slate-600 cursor-pointer"
                        @click="ToWrite">
                        写回答</div>
                </div>
            </div>
        </header>
        <!-- 主体 -->
        <Answer :questionId="questionId"></Answer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuestionStore } from '@/stores/question'
import { useMainFloorStore } from "@/stores/home"
import Answer from "@/views/Question/Answer/index.vue"

// 创建路由器实例
const router = useRouter()
// 创建路由实例
const route = useRoute()
const questionId = route.query.questionId as string

// 创建Store实例
const questionStore = useQuestionStore()
const mainFloorStore = useMainFloorStore()
const question = ref();

onBeforeMount(async () => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    if (!mainFloorStore.questionList.length) {
        await mainFloorStore.GetQuestionList()
    }
    // 获取目标问题
    question.value = mainFloorStore.questionList[Number(route.query.index)]
    // 获取目标问题下的回答
    questionStore.GetAnswerList(questionId)
})

const ToWrite = () => {
    router.push({ name: "Write", params: { questionId } })
}

</script>

<style lang='' scoped>

</style>