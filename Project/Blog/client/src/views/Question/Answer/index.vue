<template>
    <div class="w-sHeart mx-auto mt-6">
        <div class="w-full px-4 py-2 mb-4 relative bg-white rounded-sm shadow" v-for="i in answerList" :key="i._id">
            <!-- 删除按钮 -->
            <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认"
                @confirm="deleteAnswer($props.questionId, i._id)">
                <div class="absolute top-0 right-1 w-6 h-6 leading-5 text-xl text-center cursor-pointer">x</div>
            </a-popconfirm>
            <!-- 回答头部 -->
            <div class="flex">
                <!-- 头像 -->
                <div class=" w-12 h-12 bg-yellow-700 rounded-full"></div>
                <!-- 昵称 -->
                <div class="ml-2">{{ i.answerer.nickname }}</div>
            </div>
            <!-- 回答主体 -->
            <div class="w-full my-4" v-html="i.content">
            </div>
            <!-- 赞和质疑 -->
            <div class="flex w-24" @click="feedback">
                <div class="w-16 h-7 border-slate-600 flex justify-center items-center border-1 cursor-pointer rounded-xl mr-1"
                    :class="{ 'bg-slate-600': i.isLikes, 'text-white': i.isLikes }" :data-answerId="i._id"
                    :data-which="1" :data-isLikes="i.isLikes" :data-isHesitation="i.isHesitation">
                    赞&nbsp;{{ i.likes }}
                </div>
                <div class="w-7 h-7 border-slate-600 border-1 flex justify-center items-center cursor-pointer rounded-xl text-2xl"
                    :class="{ 'bg-slate-600': i.isHesitation, 'text-white': i.isHesitation }" :data-answerId="i._id"
                    :data-which="0" :data-isLikes="i.isLikes" :data-isHesitation="i.isHesitation">
                    ▾
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang = 'ts' >
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia';
import { useAnswerStore } from '@/stores/answer'

// 接受父组件传递过来的Props
const props = defineProps(['questionId'])

// 创建question仓库
const answerStore = useAnswerStore()
const { answerList } = storeToRefs(answerStore)

const deleteAnswer = (questionId: string, answerId: string) => {
    answerStore.DeleteAnswer(questionId, answerId)
}

const feedback = async (e: any) => {
    let { answerid, which, islikes, ishesitation } = e.target.dataset
    // 存在dataset里面的数据类型都是string，需要转换成boolean
    islikes = islikes === 'true' ? true : false
    ishesitation = ishesitation === 'true' ? true : false
    if (which === "1") {
        // 当前是点赞
        await answerStore.LikeAnswer(props.questionId, answerid, !islikes)
        // 如果踩的值是真，那么点赞的同时需要取消踩
        if (ishesitation) {
            await answerStore.HesitateAnswer(props.questionId, answerid, !ishesitation)
        }
        // 若在有赞的情况下还点了赞，那么就是取消
        if (islikes) {
            await answerStore.ClearIsLikesAndIsHesitation(props.questionId, answerid)
        }
        answerStore.GetAnswerList(props.questionId)
    } else {
        // 当前是踩
        await answerStore.HesitateAnswer(props.questionId, answerid, !ishesitation)
        // 如果点赞的值是真，那么踩的同时需要取消点赞
        if (islikes) {
            await answerStore.LikeAnswer(props.questionId, answerid, !islikes)
        }
        // 若在有踩的情况下还点了踩，那么就是取消
        if (ishesitation) {
            await answerStore.ClearIsLikesAndIsHesitation(props.questionId, answerid)
        }
        answerStore.GetAnswerList(props.questionId)
    }
}

</script>
 
<style lang = '' scoped >

</style>