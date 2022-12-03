<template>
    <swiper :modules="modules" :autoplay="{ pauseOnMouseEnter: true, disableOnInteraction: false }" :slides-per-view="1"
        :pagination="{ clickable: true }">
        <swiper-slide v-for="i in newsList" :key="i.sourceId"
            class="h-80 md:h-96 2xl:h-120 flex justify-center bg-cover bg-gradient-to-l from-slate-400">
            <div class="relative w-2/3">
                <img :src="i.imgsrc" alt="" class="absolute right-0 w-10/12 h-full opacity-60" v-if="i.imgsrc">
                <div class="w-full absolute top-1/2 -translate-y-1/2 text-white">
                    <!-- 标题 -->
                    <div class="text-3xl 2xl:text-4xl mt-10 font-semibold">{{ i.title }}</div>
                    <!-- 简介 -->
                    <div class="text-sm mt-10 2xl:mt-16 2xl:text-base w-3/5">&nbsp;&nbsp;&nbsp;&nbsp;{{ i.digest }}...
                    </div>
                    <!-- 跳转连接 -->
                    <div class="flex justify-end mt-10">
                        <a :href="i.url" target="_blank" class="text-white text-xs mr-4" v-show="i.url">查看原文-></a>
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
// 引入swiper轮播功能库 核心 拓展功能 样式
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const customStore = useCustomStore()
const { newsList } = storeToRefs(customStore)

onMounted(() => {
    customStore.UpdateNewsList()
})
// 提供给swiper组件的模块，不提供的话在属性中写了也没用
const modules = [Pagination, Autoplay]

</script>

<style lang='' scoped>

</style>