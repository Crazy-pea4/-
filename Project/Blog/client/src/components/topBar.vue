<template>
    <div v-if="route.meta.isShowTopBar"
        class="absolute flex justify-around text-3xl h-16 items-center top-0 left-12 lg:left-12 2xl:left-24 z-20">
        <div class="flex flex-col text-center" @click="router.replace({ name: 'Home' })">
            <home-filled class="cursor-pointer py-2 px-4" />
        </div>
        <div class="flex flex-col text-center" @click="visible = !visible"
            :class="{ 'invisible': !route.meta.isShowCreateQuestion }">
            <plus-square-outlined class="cursor-pointer py-2 px-4" />
        </div>
        <!-- 对话框 -->
        <div>
            <a-modal v-model:visible="visible" title="新增问题" :destroy-on-close="true" @ok="handleOk" okText="创建"
                cancelText="取消">
                <a-form ref="formRef" :model="formState" name="basic" autocomplete="off">
                    <!-- 问题标题 -->
                    <a-form-item label="问题" name="title" :rules="[{ required: true, message: '请输入标题！' }]">
                        <a-input v-model:value="formState.title" placeholder="请输入问题标题" />
                    </a-form-item>
                    <!-- 问题描述 -->
                    <a-form-item label="描述" name="descriptions" :rules="[{ required: true, message: '请输入标题！' }]">
                        <a-textarea v-model:value="formState.descriptions" placeholder="请输入问题的描述" :rows="4"
                            :maxlength="500" :showCount="true" />
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, PlusSquareOutlined } from '@ant-design/icons-vue'
import { useQuestionStore } from "@/stores/question"
import type { CreateQuestionData } from "@/@types/api/question"
import type { FormInstance } from 'ant-design-vue';

const mainFloorStore = useQuestionStore()

// 创建路由器实例
const router = useRouter()
const route = useRoute()

// 获取form表单元素
const formRef = ref<FormInstance>();
interface FormState {
    title: string;
    descriptions: string;
}

const isShow = ref(true)

const formState = reactive<FormState>({
    title: '',
    descriptions: '',
});

// 对话框显示变量
const visible = ref(false);

const handleOk = () => {
    formRef.value!
        .validateFields()
        .then(async (values) => {
            await mainFloorStore.CreateQuestion(values as CreateQuestionData)
            visible.value = false;
            formRef.value!.resetFields()
        })
        .catch(info => {
            console.log('Failed:', info);
        });
};

</script>

<style lang='css' scoped>
.modal {
    background-color: black
}
</style>