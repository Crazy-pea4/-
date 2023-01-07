<template>
    <div class="mx-auto pb-10">
        <div class="w-full my-6 first:mt-0 last:mb-0 relative bg-black bg-opacity-40 rounded-sm" v-for="i in likedList"
            :key="i._id">
            <!-- 删除按钮 -->
            <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认" @confirm="deleteAnswer(i.questionId, i._id)">
                <div class="absolute top-0 right-1 w-6 h-6 leading-5 text-xl text-center cursor-pointer">x</div>
            </a-popconfirm>
            <!-- 回答头部 -->
            <div class="flex">
                <!-- 头像 -->
                <div class="">
                    <img class="w-14 h-14 rounded-full object-cover" :src="userSetting.avatarUrl" alt="">
                </div>
                <!-- 昵称 -->
                <div class="ml-2">{{ i.answerer.nickname }}</div>
            </div>
            <!-- 回答主体 -->
            <div class="w-full my-4" v-html="i.content">
            </div>
            <!-- 赞和质疑 -->
            <div class="flex w-24" @click="feedback($event, i.questionId)">
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

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useAnswerStore } from '@/stores/answer'
import { useUserStore } from '@/stores/user'

// 创建question仓库
const answerStore = useAnswerStore()
const { likedList } = storeToRefs(answerStore)


// 创建settingStore
const userStore = useUserStore()
const { userSetting } = storeToRefs(userStore)

onMounted(() => {
    userStore.GetUser(localStorage.getItem('id')!)

})

onMounted(() => {
    answerStore.GetAnswerLikedList()
})

const deleteAnswer = (questionId: string, answerId: string) => {
    answerStore.DeleteAnswer(questionId, answerId)
}

const feedback = async (e: any, questionId: string) => {
    let { answerid, which, islikes, ishesitation } = e.target.dataset
    // 存在dataset里面的数据类型都是string，需要转换成boolean
    islikes = islikes === 'true' ? true : false
    ishesitation = ishesitation === 'true' ? true : false
    if (which === "1") {
        // 当前是点赞
        await answerStore.LikeAnswer(questionId, answerid, !islikes)
        // 如果踩的值是真，那么点赞的同时需要取消踩
        if (ishesitation) {
            await answerStore.HesitateAnswer(questionId, answerid, !ishesitation)
        }
        // 若在有赞的情况下还点了赞，那么就是取消
        if (islikes) {
            await answerStore.ClearIsLikesAndIsHesitation(questionId, answerid)
        }
        answerStore.GetAnswerList(questionId)
    } else {
        // 当前是踩
        await answerStore.HesitateAnswer(questionId, answerid, !ishesitation)
        // 如果点赞的值是真，那么踩的同时需要取消点赞
        if (islikes) {
            await answerStore.LikeAnswer(questionId, answerid, !islikes)
        }
        // 若在有踩的情况下还点了踩，那么就是取消
        if (ishesitation) {
            await answerStore.ClearIsLikesAndIsHesitation(questionId, answerid)
        }
        answerStore.GetAnswerList(questionId)
    }
}

</script>

<style lang='' scoped>

</style>