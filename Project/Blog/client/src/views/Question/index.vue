<template>
    <div class="min-h-screen">
        <!-- 顶部问题标题区 -->
        <header class="w-full pt-10 bg-black bg-opacity-40 shadow" v-if="questionStore.question">
            <div class="w-sHeart mx-auto flex flex-col lg:w-sHeart 2xl:w-mHeart">
                <!-- 标题 -->
                <div class="w-full text-2xl font-medium">
                    {{ questionStore.question.title }}
                </div>
                <!-- 简介（描述） -->
                <div class="w-full text-sm max-h-16 my-4 overflow-hidden overflow-ellipsis">
                    {{ questionStore.question.descriptions }}
                </div>
                <!-- 操作按钮、话题 -->
                <div class="w-full flex justify-between items-center h-14">
                    <div class="flex rounded-md">
                        <div class="w-20 h-8 border-gray-200 border-1 rounded-md flex justify-center items-center cursor-pointer"
                            @click="collectingQuestion" :class="{
                                'bg-gray-200': questionStore.question.isCollected,
                                'text-gray-700': questionStore.question.isCollected
                            }">
                            收藏回答</div>
                        <div class="w-20 h-8 ml-4 border-1 flex justify-center items-center rounded-md border-gray-200 cursor-pointer"
                            @click="ToWrite">
                            写回答</div>
                    </div>
                    <div class="flex justify-center truncate">
                        <div v-for="i in questionStore.question.topics" :key="i._id"
                            class="mx-2 flex first:ml-0 last:mr-0 text-lg">
                            <img :src="i.topicPic" class="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- 主体 -->
        <div class="w-sHeart mx-auto my-6 lg:w-sHeart 2xl:w-mHeart">
            <Answer storeType="answerList" :questionId="questionId"></Answer>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuestionStore } from '@/stores/question'
import { useUserStore } from "@/stores/user"
import Answer from "@/components/Answer/index.vue"

// 创建路由器实例
const router = useRouter()
// 创建路由实例
const route = useRoute()
const questionId = route.query.questionId as string

// 创建Store实例
const questionStore = useQuestionStore()
const userStore = useUserStore()

onBeforeMount(async () => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    await questionStore.GetQuestion(questionId)
})

// 收藏答案
const collectingQuestion = async () => {
    switch (questionStore.question.isCollected) {
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