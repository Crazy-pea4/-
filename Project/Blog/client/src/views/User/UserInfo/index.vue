<template>
    <div class="w-full h-full pt-4 flex justify-center items-center bg-white">
        <div class="w-sHeart h-32 flex relative">
            <!-- 头像 -->
            <div class="h-28 w-28 mr-8">
                <a-upload v-model:file-list="fileList" :list-type="userSetting.avatarUrl ? 'picture' : 'picture-card'"
                    class="w-28 h-28 cursor-pointer" :show-upload-list="false" :before-upload="beforeUpload"
                    :customRequest="uploadAvatar">
                    <img class="h-28 w-28 rounded-full absolute top-0 object-cover" v-if="userSetting.avatarUrl"
                        :src="userSetting.avatarUrl" alt="头像" />
                    <div v-else>
                        <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined>
                        <div>上传</div>
                    </div>
                </a-upload>
            </div>
            <!-- 昵称、性别、介绍 -->
            <div class="flex flex-col items-start justify-center">
                <!-- 昵称 -->
                <div class="flex justify-center items-center text-xl relative">
                    <div class="">
                        {{ userSetting.nickname }}
                        <!-- <a-input type="text" v-model:value="userSetting.nickname" /> -->
                    </div>
                </div>
                <!-- 性别 -->
                <div class="flex justify-center items-center my-2">
                    <div class="">性别：</div>
                    <div class="">
                        <span v-show="userSetting.gender === 'male'">男</span>
                        <span v-show="userSetting.gender === 'female'">女</span>
                        <span v-show="userSetting.gender === 'unknown'">刚到地球</span>
                        <!-- <a-radio-group v-model:value="userSetting.gender" class="flex justify-between">
                            <a-radio :value="'male'">男</a-radio>
                            <a-radio :value="'female'">女</a-radio>
                            <a-radio :value="'unknown'">刚到地球</a-radio>
                        </a-radio-group> -->
                    </div>
                </div>
                <!-- 介绍 -->
                <div class="flex justify-center items-center">
                    <div class="">介绍：</div>
                    <div class="">
                        {{ userSetting.introduction }}
                        <!-- <a-textarea v-model:value="userSetting.introduction" placeholder="请输入一段介绍" :rows="4"
                            :maxlength="500" /> -->
                    </div>
                </div>
            </div>
            <!-- 修改资料 -->
            <div class="absolute right-0 bottom-4 w-20 h-8 text-center leading-7 rounded-md bg-slate-400 text-white cursor-pointer"
                @click="visible = true">
                修改资料
            </div>
        </div>
        <!-- 对话框 -->
        <div>
            <a-modal v-model:visible="visible" title="修改" @ok="saveUserInfo" okText="保存" cancelText="取消">
                <a-form :model="formState" name="basic" autocomplete="off">
                    <!-- 昵称标题 -->
                    <a-form-item label="昵称" name="username">
                        <a-input v-model:value="formState.nickname" placeholder="请输入昵称" @press-enter="saveUserInfo" />
                    </a-form-item>
                    <!-- 性别标题 -->
                    <a-form-item label="性别" name="username">
                        <a-radio-group v-model:value="formState.gender">
                            <a-radio value="male">男</a-radio>
                            <a-radio value="female">女</a-radio>
                            <a-radio value="unknown">刚到地球</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <!-- 介绍标题 -->
                    <a-form-item label="介绍" name="descriptions">
                        <a-textarea v-model:value="formState.introduction" placeholder="请输入介绍" :rows="4"
                            :maxlength="500" :showCount="true" @press-enter="saveUserInfo" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { warning } from "@/utils/message"

// 创建settingStore
const userStore = useUserStore()
const { userSetting } = storeToRefs(userStore)

onMounted(() => {
    userStore.GetUser(localStorage.getItem('id')!)
})

// 对话框显示变量
const visible = ref(false);

const nickname = ref('')
const gender = ref('')
const introduction = ref('')
watch(() => userStore.userSetting, () => {
    nickname.value = userSetting.value.nickname
    gender.value = userSetting.value.gender
    introduction.value = userSetting.value.introduction
})

// 获取form表单元素
const formState = reactive({
    nickname,
    gender,
    introduction
});

// 文件列表
const fileList = ref([]);
// 上传头像的loading图标
const loading = ref<boolean>(false);

// 上传之前的类型和大小的检查
const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        warning('只能上传jpg或png格式的图片')
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
    userStore.UploadAvatar(userSetting.value._id, form)
}

// 保存信息（不包含头像）
const saveUserInfo = (async () => {
    if (nickname.value.trim()) {
        const id = localStorage.getItem('id')!
        await userStore.EditUser(id, formState)
        visible.value = false
    } else {
        warning("昵称不能为空")
    }
})
</script>

<style lang='' scoped>

</style>