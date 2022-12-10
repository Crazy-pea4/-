<template>
    <!-- 上下箭头 -->
    <div class="w-full h-5 border-2 border-b-0 bg-white flex justify-center items-center cursor-pointer z-10"
        @click="isShow = !isShow">
        <up-outlined class="duration-300" :class="{ '-rotate-180': isShow }" />
    </div>
    <!-- 功能小图标 -->
    <div class="w-full border-2 bg-white flex flex-col overflow-hidden justify-center duration-300 items-center cursor-pointer"
        :class="{ 'h-0': !isShow, 'h-16': isShow }">
        <edit-outlined @click="visible = true" class="text-4xl" />
        <span class="text-xs">新增问题</span>
    </div>
    <!-- 对话框 -->
    <div>
        <a-modal v-model:visible="visible" title="新增问题" @ok="handleOk" okText="创建" cancelText="取消">
            <a-form ref="formRef" :model="formState" name="basic" autocomplete="off">
                <!-- 问题标题 -->
                <a-form-item label="问题" name="title" :rules="[{ required: true, message: '请输入标题！' }]">
                    <a-input v-model:value="formState.title" placeholder="请输入问题标题" />
                </a-form-item>
                <!-- 问题描述 -->
                <a-form-item label="描述" name="descriptions" :rules="[{ required: true, message: '请输入标题！' }]">
                    <a-textarea v-model:value="formState.descriptions" placeholder="请输入问题的描述" :rows="4" :maxlength="500"
                        :showCount="true" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { EditOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
import { useQuestionStore } from "@/stores/question"
import type { CreateQuestionData } from "@/@types/api/question"
const mainFloorStore = useQuestionStore()

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

<style lang='' scoped>

</style>