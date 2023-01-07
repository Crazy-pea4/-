<template>
    <!-- 列表 -->
    <div class="w-full h-auto float-left" @click="ToQuestion">
        <!-- 列表中的每一项 -->
        <TransitionGroup name="questionList" enter-active-class="animate__animated animate__fadeInDown animate__faster"
            leave-active-class="animate__animated animate__fadeOutUp animate__faster">
            <div class="w-full h-36 border-2 relative rounded-sm transition-all duration-200 flex flex-col justify-around text-center cursor-pointer my-5 px-5 first:mt-0 last:mb-0"
                v-for="(item, index) in collectedList" :key="item._id" :data-questionId="item._id" :data-index="index">
                <!-- 删除按钮 -->
                <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认" @confirm="deleteQuestion(item._id)">
                    <div class="absolute top-0 right-1 leading-6 text-xl w-6 h-6" :data-questionId="item._id"
                        @click.stop>x</div>
                </a-popconfirm>
                <!-- 问题标题 -->
                <div class="text-3xl mt-2 truncate" :data-questionId="item._id" :data-index="index">{{
                    item.title
                }}
                </div>
                <!-- 问题描述 -->
                <div class="truncate" :data-questionId="item._id" :data-index="index">{{ item.descriptions }}
                </div>
                <!-- 提出问题的人的信息 -->
                <div class="flex justify-end items-end" :data-questionId="item._id" :data-index="index">
                    <!-- 发起者 -->
                    <div class="text-sm mr-2">{{ item.questioner.nickname }}</div>
                    <!-- 发起时间 -->
                    <div class="text-xs">{{ item.createdAt }}</div>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { useQuestionStore } from "@/stores/question"

const router = useRouter()

const questionStore = useQuestionStore()
const { collectedList } = storeToRefs(questionStore)

onMounted(() => {
    questionStore.GetQuestionCollectedList()
})

// 跳转路由
const ToQuestion = (e: any) => {
    router.push({
        name: "Question", query: {
            questionId: e.target.dataset.questionid as string,
            index: e.target.dataset.index as number
        }
    })
}

// 删除问题
const deleteQuestion = (questionId: string) => {
    questionStore.DeleteQuestion(questionId)
}
</script>

<style lang='' scoped>

</style>