<template>
    <swiper :modules="modules" :autoplay="{ pauseOnMouseEnter: true, disableOnInteraction: false }" :slides-per-view="1"
        :pagination="{ clickable: true }">
        <swiper-slide v-for="i in newsList" :key="i.sourceId"
            class="h-96 flex justify-center bg-cover bg-gradient-to-l from-slate-400">
            <div class="relative w-1/2">
                <img :src="i.imgsrc" alt="" class="absolute right-0 w-10/12 h-full opacity-60">
                <div class="absolute top-36 left-6 text-white">
                    <!-- 标题 -->
                    <div class="text-2xl font-semibold">{{ i.title }}</div>
                    <!-- 简介 -->
                    <div class="text-sm mt-6 w-3/5">{{ i.digest }}...</div>
                    <!-- 跳转连接 -->
                    <div class="flex justify-end mt-10">
                        <a :href="i.url" class="text-white text-xs mr-4">查看原文-></a>
                    </div>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import useCustomStore from "@/stores/custom"
// 引入swiper轮播功能库
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const customStore = useCustomStore()
const { newsList } = storeToRefs(customStore)

onMounted(() => {
    customStore.updateNewsList()
})

const modules = [Pagination, Autoplay]

</script>

<style lang='' scoped>

</style>