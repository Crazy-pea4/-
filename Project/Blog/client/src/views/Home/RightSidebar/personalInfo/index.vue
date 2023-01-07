<template>
    <div>
        <div class="w-52 h-80 border-2 border-gray-700 relative">
            <!-- 头像 -->
            <div class="h-14 relative">
                <img @click="router.push({ name: 'User' })" class="h-24 w-24 rounded-full absolute
                -top-10 left-1/2 -translate-x-1/2 object-cover cursor-pointer" :src="userSetting.avatarUrl" alt="头像" />
                <div>
                    <a-popconfirm title="确认登出吗？" ok-text="Yes" cancel-text="No" @confirm="confirm" @cancel="cancel">
                        <span class="absolute top-3/4 right-2 font-semibold cursor-pointer">登出</span>
                    </a-popconfirm>
                </div>
            </div>
            <!-- 信息框 -->
            <div class="w-full h-64 pt-2 flex flex-col items-center">
                <!-- 姓名、介绍 -->
                <div class="text-center">
                    <div @click="router.push({ name: 'User' })" class="text-xl mb-4 cursor-pointer hover:underline">{{
                        userSetting.nickname
                    }}</div>
                    <div class="text-sm max-h-12 overflow-ellipsis overflow-hidden">{{ userSetting.introduction }}</div>
                </div>
                <!-- 收藏问题、点赞回答 -->
                <div class="w-full h-32 flex justify-around items-center">
                    <div @click="router.push({ name: 'CollectedQuestion' })" class="cursor-pointer hover:underline">
                        <star-filled class="mx-1 text-lg" />
                        <span class="align-middle">收藏问题</span>
                    </div>
                    <div @click="router.push({ name: 'LikedAnswer' })" class="cursor-pointer hover:underline">
                        <like-filled class="mx-1 text-lg" />
                        <span class="align-middle">点赞回答</span>
                    </div>
                </div>
                <!-- Ip显示 -->
                <Ip />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import Ip from '../Ip/index.vue'
import { useRouter } from 'vue-router'
import { StarFilled, LikeFilled } from '@ant-design/icons-vue';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

// 创建路由器router
const router = useRouter()

// 创建settingStore
const userStore = useUserStore()
const { userSetting } = storeToRefs(userStore)

onMounted(() => {
    userStore.GetUser(localStorage.getItem('id')!)
})

const confirm = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('isValid')
    router.replace({ name: 'Login' })
};

const cancel = () => {
};

</script>

<style lang='' scoped>

</style>