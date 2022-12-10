<template>
    <!-- 遮罩层 -->
    <div class="w-screen h-screen opacity-50 bg-stone-800 fixed top-0 left-0 z-20" @click="changeShow"
        :class="{ 'hidden': !isMaskShow }">
    </div>
    <!-- 左侧侧边栏 -->
    <div class="w-48 h-full fixed py-4 transition-all duration-300 bg-white border-r-2 z-50"
        v-if="$route.meta.isShowSideBar" :class="{ '-translate-x-full': !isMaskShow }">
        <!-- 每个小按钮 -->
        <div class="flex justify-around items-center w-full h-14 my-4 first:mt-0 last:mb-0 border-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer"
            v-for="i, index in iconArr" :key="index" @click="ToLocation(index)">
            <component :is="i.icon" class="flex items-center text-3xl" />
            <div class="flex">{{ i.text }}</div>
        </div>
        <!-- 弹出按钮 -->
        <div class="float-left w-14 h-12 ml-48 flex justify-center items-center bg-slate-600 my-4 text-white text-xl absolute top-0 border-2 border-l-0 cursor-pointer"
            @click="changeShow">
            <menu-outlined />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { HomeOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons-vue'
// 创建路由器实例
const router = useRouter()

// 图标数组（方便动态渲染）
const iconArr = ref([
    { icon: HomeOutlined, text: "Home" },
    { icon: UserOutlined, text: "User" }
])

const isMaskShow = ref(false)
const changeShow = () => {
    isMaskShow.value = !isMaskShow.value
}

// 跳转路由方法
const ToLocation = (index: number) => {
    switch (index) {
        case 0:
            router.replace({ name: "Home" })
            changeShow()
            break;
        case 1:
            router.replace({ name: "User" })
            changeShow()
            break;
    }
}

</script>

<style lang='' scoped>

</style>