<template>
    <!-- 列表 -->
    <div class="w-full h-auto float-left" @click="ToQuestion">
        <!-- 列表中的每一项 -->
        <template v-if="questionList.length > 0">
            <TransitionGroup name="questionList"
                enter-active-class="animate__animated animate__fadeInDown animate__faster"
                leave-active-class="animate__animated animate__fadeOutUp animate__faster">
                <div class="w-full h-36 border-2 border-gray-300 relative rounded-sm hover:shadow
                transition-all duration-200 flex flex-col justify-around text-center cursor-pointer my-5 px-5 first:mt-0 last:mb-0"
                    v-for="(item, index) in questionList" :key="item._id" :data-questionId="item._id">
                    <!-- 删除按钮 -->
                    <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认" @confirm="deleteQuestion(item._id)">
                        <div class="absolute top-0 right-1 leading-6 text-xl w-6 h-6" :data-questionId="item._id"
                            @click.stop>x</div>
                    </a-popconfirm>
                    <!-- 问题标题 -->
                    <div class="text-3xl mt-2 truncate" :data-questionId="item._id">{{ item.title }}
                    </div>
                    <!-- 问题描述 -->
                    <div class="truncate" :data-questionId="item._id">{{ item.descriptions }}
                    </div>
                    <!-- 提出问题的人的信息 -->
                    <div class="flex justify-end items-end" :data-questionId="item._id">
                        <!-- 发起者 -->
                        <div class="text-sm mr-2">{{ item.questioner.nickname }}</div>
                        <!-- 发起时间 -->
                        <div class="text-xs">{{ item.createdAt }}</div>
                    </div>
                </div>
            </TransitionGroup>
        </template>
        <template v-else>
            <div @click.stop class="absolute top-1/4 left-1/2 -translate-x-1/2 text-gray-400">
                点击旁边的新增按钮创建第一条问题吧！
            </div>
        </template>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useQuestionStore } from '@/stores/question'
// import useAfterHandelTimeHooks from "@/hooks/useAfterHandelTimeHooks"

// 创建路由器实例
const router = useRouter()

// 创建store实例 并响应式地解构
const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)
// 使用hooks
// const isShow = useAfterHandelTimeHooks(mainFloorStore)

onMounted(() => {
    questionStore.GetQuestionList()
})

// 跳转路由
const ToQuestion = (e: any) => {
    router.push({
        name: "Question", query: {
            questionId: e.target.dataset.questionid as string,
        }
    })
}

// 删除问题
const deleteQuestion = (questionId: string) => {
    questionStore.DeleteQuestion(questionId)
}

</script>

<style lang='css' scoped>

</style>