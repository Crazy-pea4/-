<template>
    <!-- 左侧侧边栏 -->
    <div class="w-14 h-auto fixed top-1/2 py-4 -translate-y-1/2 -translate-x-8 hover:translate-x-0 transition-all duration-300 border-2 rounded-r-xl"
        v-if="$route.meta.isShowSearchBar">
        <div class="flex justify-center items-center w-full h-14 my-3 first:mt-0 last:mb-0 border-y-2 rounded-r-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
            v-for="icon, index in iconArr" :key="index" @click="ToLocation(index)">
            <component :is="icon" class="flex items-center text-3xl" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons-vue'
// 创建路由器实例
const router = useRouter()
// 图标数组（方便动态渲染）
const iconArr = ref([HomeOutlined, SettingOutlined])
// 跳转路由方法
const ToLocation = (index: number) => {
    switch (index) {
        case 0:
            router.replace({ name: "Home" })
            break;
        case 1:
            router.replace({ name: "Setting" })
            break
    }
}

</script>

<style lang='' scoped>

</style>