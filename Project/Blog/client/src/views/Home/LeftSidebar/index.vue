<template>
    <!-- 上下箭头 -->
    <div class="w-full h-5 border-2 border-b-0 flex justify-center items-center cursor-pointer z-10"
        @click="isShow = !isShow">
        <up-outlined class="duration-300" :class="{ '-rotate-180': isShow }" />
    </div>
    <!-- 功能小图标 -->
    <div class="w-full border-2 flex flex-col overflow-hidden justify-center duration-300 items-center cursor-pointer"
        :class="{ 'h-0': !isShow, 'h-16': isShow }">
        <edit-outlined @click="visible = true" class="text-4xl" />
        <span>新增问题</span>
    </div>
    <!-- 对话框 -->
    <div>
        <a-modal v-model:visible="visible" title="新增问题" @ok="handleOk">
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
import dayjs from "dayjs"
import { createQuestion } from "@/api/question"
import { useMainFloorStore } from "@/stores/home"
const mainFloorStore = useMainFloorStore()

// 获取form表单元素
const formRef = ref<FormInstance>();
interface FormState {
    title: string;
    descriptions: string;
}

// 创建路由器实例
const router = useRouter()

const isShow = ref(true)
// const ToWrite = () => {
//     router.push({ name: "Write" })
// }
const formState = reactive<FormState>({
    title: '',
    descriptions: '',
});

// 对话框显示变量
const visible = ref(false);

const create = async (values: { [key: string]: any }) => {
    const time = dayjs(new Date()).format("YYYY-M-D HH:mm")
    try {
        values.createdAt = time
        values.updatedAt = time
        await createQuestion(values)
        visible.value = false;
        formRef.value!.resetFields()
        // 新建问题后，再一次获取问题列表
        mainFloorStore.updateQuestionList()
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}
const handleOk = () => {
    formRef.value!
        .validateFields()
        .then((values) => {
            create(values)
        })
        .catch(info => {
            console.log('Failed:', info);
        });
};

</script>

<style lang='' scoped>

</style>