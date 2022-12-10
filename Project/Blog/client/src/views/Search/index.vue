<template>
    <div class=" min-h-screen bg-zinc-100 pt-20">
        <!-- 列表 -->
        <SearchList :searchList="searchList" v-if="searchList.length > 0" />
        <div v-else class="flex justify-center items-center">
            <img src="../../../assets/pinia.svg" alt="" class="w-20">
            <span class="self-end align-bottom">什么都没有找到呢</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import SearchList from './SearchList/index.vue'
import { storeToRefs } from 'pinia'
import { useQuestionStore } from '@/stores/question'

// 创建store实例 并响应式地解构
const questionStore = useQuestionStore()
const { searchList } = storeToRefs(questionStore)

// 防止刷新后数据消失
onMounted(() => {
    if (questionStore.searchList.length === 0) {
        let keyword
        // 由于null不会触发参数默认值，所以要手动改一下为undefined
        if (sessionStorage.getItem('keyword') === null) keyword = undefined
        else keyword = sessionStorage.getItem('keyword')

        const props = { keyword: keyword!, limit: 10, page: 0 }
        questionStore.GetSearchList(props)
    }
})


</script>

<style lang='css' scoped>

</style>