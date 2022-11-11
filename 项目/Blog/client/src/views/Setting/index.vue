<template>
    <div class="w-4/6 h-screen mx-auto p-10">
        <div class="w-full h-full flex flex-col justify-around items-center bg-slate-400">
            <!-- 头像 -->
            <div class="w-24 h-24 rounded-full bg-blue-600">
                <!-- <img src="" alt=""> -->
            </div>
            <!-- 用户数据修改框 -->
            <div class="w-1/2 flex flex-wrap">
                <!-- 昵称 -->
                <div class="w-full flex items-center mb-10">
                    <div class="">昵称：</div>
                    <div class="shadow-none w-10/12">
                        <a-input type="text" v-model:value="userSetting.nickname" />
                    </div>
                </div>
                <!-- 性别 -->
                <div class="w-full flex mb-10">
                    <div class="">性别：</div>
                    <div class="w-10/12">
                        <a-radio-group v-model:value="userSetting.gender" class="flex justify-between">
                            <a-radio :value="'male'">男</a-radio>
                            <a-radio :value="'female'">女</a-radio>
                            <a-radio :value="'unknown'">刚到地球</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <!-- 介绍 -->
                <div class="w-full flex">
                    <div class="">介绍：</div>
                    <div class="w-10/12">
                        <a-textarea v-model:value="userSetting.introduction" placeholder="请输入一段介绍" :rows="4"
                            :maxlength="500" />
                    </div>
                </div>
            </div>
            <!-- 保存按钮 -->
            <div>
                <a-button type="primary" @click="saveUserInfo">保存</a-button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { editUser } from '@/api/user'

// 创建settingStore
const settingStore = useSettingStore()
const { userSetting } = storeToRefs(settingStore)

onMounted(() => {
    settingStore.updateUserSetting(localStorage.getItem('id')!)
})

const saveUserInfo = (async () => {
    const id = localStorage.getItem('id')!
    const res = await editUser(id, userSetting.value)
    console.log(res);
})
</script>

<style lang='' scoped>

</style>