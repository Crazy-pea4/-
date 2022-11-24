<template>
    <div class="w-sHeart h-screen mx-auto bg-slate-600">
        <!-- 顶部问题标题区 -->
        <header class="w-full h-32 bg-yellow-200">

        </header>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuestionStore } from '@/stores/question'

// 创建路由实例
const route = useRoute()
// 创建QuestionStore实例
const questionStore = useQuestionStore()

onMounted(() => {
    questionStore.updateAnswerList(route.query.questionid as string)
})



</script>

<style lang='' scoped>

</style>