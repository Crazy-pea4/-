<template>
    <div>
        <p class="text-xl font-semibold my-2">每日新闻</p>
        <swiper :modules="modules" :slides-per-view="1" class="w-52" :loop="true"
            :autoplay="{ pauseOnMouseEnter: true, disableOnInteraction: false }">
            <swiper-slide v-for="i in newsList" :key="i.sourceId"
                class="w-full h-28 md:h-28 2xl:h-28 flex flex-col select-none relative">
                <!-- 新闻标题 -->
                <div>&nbsp&nbsp&nbsp&nbsp{{ i.title }}</div>
                <!-- 来源 -->
                <div class="flex absolute bottom-8 right-0 justify-end">
                    <div class="">{{ i.source }}</div>-
                    <div><a :href="i.url" class="underline text-inherit" target="_blank">查看</a></div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import useCustomStore from "@/stores/custom";
// 引入swiper轮播功能库 核心 拓展功能 样式
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const customStore = useCustomStore()
const { newsList } = storeToRefs(customStore)

onMounted(async () => {
    await customStore.UpdateNewsList()
})
// 提供给swiper组件的模块，不提供的话在属性中写了也没用
const modules = [Autoplay]

</script>

<style lang='' scoped>

</style>