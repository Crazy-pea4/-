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
                    <div
                        class="w-20 h-8 ml-4 border-1 flex justify-center items-center rounded-md border-slate-600 cursor-pointer">
                        写回答</div>
                </div>
            </div>
        </header>
        <!-- 主体 -->
        <div class="w-sHeart mx-auto mt-6">
            <div class="w-full px-4 py-2 mb-4 bg-white rounded-sm shadow" v-for="i in answerList" :key="i._id">
                <!-- 回答头部 -->
                <div class="flex">
                    <!-- 头像 -->
                    <div class=" w-12 h-12 bg-yellow-700 rounded-full"></div>
                    <!-- 昵称 -->
                    <div class="ml-2">{{ i.answerer.nickname }}</div>
                </div>
                <!-- 回答主体 -->
                <div class="w-full my-4">
                    {{ i.content }}
                </div>
                <!-- 赞和质疑 -->
                <div class="flex">
                    <div
                        class="w-16 h-7 bg-slate-600 flex justify-center items-center cursor-pointer text-white rounded-xl mr-1">
                        赞
                    </div>
                    <div
                        class="w-7 h-7 bg-slate-600 flex justify-center items-center cursor-pointer text-white rounded-xl">
                        <caret-down-outlined />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '@/stores/question'
import { useMainFloorStore } from "@/stores/home"
import { CaretDownOutlined } from '@ant-design/icons-vue';

// 创建路由实例
const route = useRoute()
const query = route.query
console.log(query);

// 创建Store实例
const questionStore = useQuestionStore()
const { answerList } = storeToRefs(questionStore)
const mainFloorStore = useMainFloorStore()
let question = ref();

onBeforeMount(async () => {
    // 由于使用了其他模块的store，在页面刷新的时候也要加上mainFloor的数据获取步骤
    if (!mainFloorStore.questionList.length) {
        await mainFloorStore.updateQuestionList()
    }
    questionStore.updateAnswerList(query.questionid as string)
    question.value = mainFloorStore.questionList[Number(query.index)]
})
onMounted(() => {
})

</script>

<style lang='' scoped>

</style>