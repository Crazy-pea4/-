<template>
    <div class="min-h-screen">
        <!-- 顶部问题标题区 -->
        <header class="w-full pt-10 bg-black bg-opacity-40 shadow" v-if="question">
            <div class="w-sHeart mx-auto flex flex-col">
                <!-- 标题 -->
                <div class="w-full text-2xl font-medium mb-2">
                    {{ question.title }}
                </div>
                <!-- 简介（描述） -->
                <div class="w-full text-sm max-h-16 overflow-hidden overflow-ellipsis">
                    {{ question.descriptions }}
                </div>
                <!-- 操作按钮 -->
                <div class="w-full flex rounded-md my-4">
                    <div class="w-20 h-8 border-gray-200 border-1 rounded-md flex justify-center items-center cursor-pointer"
                        @click="collectingQuestion" :class="{
                            'bg-gray-200': question.isCollected,
                            'text-gray-700': question.isCollected
                        }">
                        收藏回答</div>
                    <div class="w-20 h-8 ml-4 border-1 flex justify-center items-center rounded-md border-gray-200 cursor-pointer"
                        @click="ToWrite">
                        写回答</div>
                </div>
            </div>
        </header>
        <!-- 主体 -->
        <Answer></Answer>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useAnswerStore } from '@/stores/answer'
import { useQuestionStore } from '@/stores/question'
import { useUserStore } from "@/stores/user"
import Answer from "@/views/Question/Answer/index.vue"

// 创建路由器实例
const router = useRouter()
// 创建路由实例
const route = useRoute()
const questionId = route.query.questionId as string

// 创建Store实例
const answerStore = useAnswerStore()
const questionStore = useQuestionStore()
const { question } = storeToRefs(questionStore)
const userStore = useUserStore()

onBeforeMount(async () => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    await questionStore.GetQuestion(questionId)
    // 获取目标问题下的回答
    await answerStore.GetAnswerList(questionId)
})

// 收藏答案
const collectingQuestion = async () => {
    switch (question.value.isCollected) {
        case true:
            await userStore.UncollectingQuestions(questionId)
            break;
        case false:
            await userStore.CollectingQuestions(questionId)
            break;
    }
}

// 写回答
const ToWrite = () => {
    router.push({ name: "Write", params: { questionId } })
}

</script>

<style lang='' scoped>

</style>