<template>
    <div class="mt-8 w-sHeart py-1 px-3 bg-white">
        <!-- 顶部tabBar -->
        <div class="flex h-10 relative">
            <div v-for="(i, index) in tabBar" :key="index"
                class=" w-16 border-slate-600 hover:bg-gray-100 cursor-pointer text-base flex justify-center items-center mx-2 first:ml-0 last:mr-0"
                :class="{ 'border-b-2': $route.meta.index === index }" @click="$router.replace({ name: i.routeName })">
                {{ i.title }}
            </div>
            <div class="absolute top-0 right-0 h-10 leading-10 cursor-pointer" @click="refresh">
                <reload-outlined class="text-base float-left mt-1" />
                <span class="ml-1 float-left">刷新</span>
            </div>
        </div>
        <!-- 主体内容部分 -->
        <div class="mt-8 h-130">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { ReloadOutlined } from '@ant-design/icons-vue';
import { useQuestionStore } from "@/stores/question"

const questionStore = useQuestionStore()
const refresh = () => {
    questionStore.GetQuestionCollectedList()
}

const tabBar = [{
    title: '收藏问题',
    routeName: 'CollectedQuestion'
}, {
    title: '点赞回答',
    routeName: 'LikedAnswer'
}]

</script>

<style lang='' scoped>

</style>