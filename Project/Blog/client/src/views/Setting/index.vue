<template>
    <div class="w-sHeart h-120 mx-auto my-auto">
        <div class="w-full h-full flex flex-col justify-around items-center bg-slate-400">
            <!-- 头像 -->
            <div class="w-24 h-24 relative">
                <a-upload v-model:file-list="fileList" :list-type="userSetting.avatarUrl ? 'picture' : 'picture-card'"
                    class="w-24 h-24 cursor-pointer" :show-upload-list="false" :before-upload="beforeUpload"
                    :customRequest="uploadAvatar">
                    <img class="h-24 w-24 rounded-full absolute top-0" v-if="userSetting.avatarUrl"
                        :src="userSetting.avatarUrl" alt="头像" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div>上传</div>
                    </div>
                </a-upload>
                <picture-outlined class="absolute right-2 bottom-0 text-white text-lg" />
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
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { PictureOutlined } from '@ant-design/icons-vue';
import { editUser } from '@/api/user'

// 创建settingStore
const settingStore = useSettingStore()
const { userSetting } = storeToRefs(settingStore)

onMounted(() => {
    settingStore.GetUser(localStorage.getItem('id')!)
})

// 文件列表
const fileList = ref([]);
// 上传头像的loading图标
const loading = ref<boolean>(false);

// 上传之前的类型和大小的检查
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        console.log('只能上传jpg或png格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        console.log('图片大小必须小于2MB');
    }
    return isJpgOrPng && isLt2M;
};
// 上传头像方法
const uploadAvatar = (file: any) => {
    const form = new FormData()
    form.append('file', file.file)
    settingStore.UploadAvatar(userSetting.value._id, form)
}
// 保存信息（不包含头像）
const saveUserInfo = (async () => {
    const id = localStorage.getItem('id')!
    await editUser(id, userSetting.value)
})

</script>

<style lang='' scoped>

</style>