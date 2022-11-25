<template>
    <!-- 列表 -->
    <div class="w-full h-auto" @click="ToQuestion">
        <!-- 列表中的每一项 -->
        <div class="w-full h-36 border-2 rounded-xl transition-all duration-200 flex flex-col justify-around text-center cursor-pointer hover:shadow-md my-5 px-5 first:mt-0 last:mb-0"
            v-for="(item, index) in questionList" :key="item._id" :data-questionId="item._id" :data-index="index">
            <div class="text-2xl" :data-questionId="item._id" :data-index="index">{{ item.title }}</div>
            <div :data-questionId="item._id" :data-index="index">{{ item.descriptions }}</div>
            <!-- 提出问题的人的信息 -->
            <div class="flex justify-end items-end" :data-questionId="item._id" :data-index="index">
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
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useMainFloorStore } from '@/stores/home'
// import useAfterHandelTimeHooks from "@/hooks/useAfterHandelTimeHooks"

// 创建路由器实例
const router = useRouter()

// 创建store实例 并响应式地解构
const mainFloorStore = useMainFloorStore()
const { questionList } = storeToRefs(mainFloorStore)
// 使用hooks
// const isShow = useAfterHandelTimeHooks(mainFloorStore)

onMounted(() => {
    mainFloorStore.updateQuestionList()
})

// 跳转路由
const ToQuestion = (e: any) => {
    router.push({
        name: "Question", query: {
            questionid: e.target.dataset.questionid as string,
            index: e.target.dataset.index as number
        }
    })
    // console.log(e);
}

</script>

<style lang='' scoped>
</style>