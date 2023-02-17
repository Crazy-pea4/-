<template>
    <div class="w-full min-h-full mx-auto mb-10">
        <a-skeleton active :loading="loading">
            <div class="w-full px-4 py-2 my-6 first:mt-0 last:mb-0 relative bg-black bg-opacity-40 rounded-sm shadow"
                v-for="i in answerStore[props.storeType]" :key="i._id">
                <!-- 删除按钮 -->
                <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认"
                    @confirm="deleteAnswer(i.questionId, i._id)">
                    <div class="absolute top-0 right-1 w-6 h-6 leading-5 text-xl text-center cursor-pointer">x</div>
                </a-popconfirm>
                <!-- 回答头部 -->
                <div class="flex">
                    <!-- 头像 -->
                    <div class="">
                        <img class="w-14 h-14 rounded-full object-cover"
                            :src="i.answerer.avatarUrl ? i.answerer.avatarUrl : 'https://yarh-blog-1308742510.cos.ap-guangzhou.myqcloud.com/404.jpg'"
                            alt="">
                    </div>
                    <!-- 昵称 -->
                    <div class="ml-2 text-lg">{{ i.answerer ? i.answerer.nickname : "用户不存在" }}</div>
                </div>
                <!-- 回答主体 -->
                <div class="w-full my-4 relative" v-html="i.content">
                </div>
                <!-- 赞和质疑 -->
                <div class="flex w-24" @click="feedback($event, i.questionId)">
                    <div class="w-16 h-7 flex justify-center items-center border-1 cursor-pointer rounded-xl mr-1"
                        :class="{
                            'bg-slate-600': i.isLikes,
                            'text-white': i.isLikes,
                            'border-slate-600': i.isLikes
                        }" :data-answerId="i._id" :data-which="1" :data-isLikes="i.isLikes"
                        :data-isHesitation="i.isHesitation">
                        赞&nbsp;{{ i.likes }}
                    </div>
                    <div class="w-7 h-7 border-1 flex justify-center items-center cursor-pointer rounded-xl text-2xl"
                        :class="{ 
                            'bg-slate-600': i.isHesitation,
                            'text-white': i.isHesitation,
                            'border-slate-600': i.isHesitation
                        }" :data-answerId="i._id" :data-which="0" :data-isLikes="i.isLikes"
                        :data-isHesitation="i.isHesitation">
                        ▾
                    </div>
                </div>
            </div>
        </a-skeleton>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, onUpdated } from 'vue';
import { useAnswerStore } from '@/stores/answer';
import hljs from 'highlight.js';
import 'highlight.js/styles/panda-syntax-dark.css';
import 'highlightjs-line-numbers.js';

const props = defineProps<{
    questionId?: string,
    storeType: 'answerList' | 'likedList'
}>();

const loading = ref(true);
const answerStore = useAnswerStore();
onMounted(async () => {
    try {
        switch (props.storeType) {
            case "answerList":
                await answerStore.GetAnswerList(props.questionId!);
                loading.value = false;
                break;
            case "likedList":
                await answerStore.GetAnswerLikedList();
                loading.value = false;
                break
        }
    } catch (err) {
        console.log(err);
    }
})
/** 
 * hljs.highlightAll()是根据<pre><code></code></pre>来进行高亮显示
 * 但是a-skeleton组件的子组件生成比较慢，下面两句放在onMounted会失效 */
onUpdated(() => {
    hljs.highlightAll();
    // 这段代码说明看源码
    // @ts-ignore
    window.hljs.initLineNumbersOnLoad();
})

const deleteAnswer = (questionId: string, answerId: string) => {
    answerStore.DeleteAnswer(questionId, answerId)
};

const feedback = async (e: any, questionId: string) => {
    try {
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
            await answerStore.GetAnswerList(questionId)
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
            await answerStore.GetAnswerList(questionId)
        }
    } catch (err) {
        console.log(err);
    }
};

</script>

<style lang='css' scoped>
/** 滚动条 */
:deep(.hljs) {
    overflow-x: auto;
}

:deep(.hljs::-webkit-scrollbar) {
    width: 12px !important;
    height: 12px !important;
}

:deep(.hljs::-webkit-scrollbar-thumb) {
    height: 30px !important;
    background: #d1d8e6;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 19px;
    opacity: 0.8;
}

:deep(.hljs::-webkit-scrollbar-thumb:hover) {
    background: #a5b3cf;
    background-clip: content-box;
    border: 2px solid transparent;
}

:deep(.hljs::-webkit-scrollbar-track-piece) {
    width: 30px;
    height: 30px;
    background: #333;
}

::-webkit-scrollbar-button {
    display: none;
}
</style>