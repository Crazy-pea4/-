<template>
    <div>
        <div v-if="route.meta.isShowTopBar"
            class="absolute left-1/2 -translate-x-1/2 flex justify-between text-3xl h-14 w-11/12 z-10">
            <div class="flex">
                <div @click="router.replace({ name: 'Home' })">
                    <home-filled class="cursor-pointer py-2 px-4" />
                </div>
                <div @click="visible = !visible" :class="{ 'invisible': !route.meta.isShowCreateQuestion }">
                    <plus-square-outlined class="cursor-pointer py-2 px-4" />
                </div>
            </div>
            <div class="">
                <logout-outlined class="cursor-pointer py-2 px-4" @click="toLogin" />
            </div>
        </div>
        <!-- 对话框 -->
        <div>
            <a-modal v-model:visible="visible" class="modal" title="新增问题" :destroy-on-close="true" @ok="handleOk"
                okText="创建" cancelText="取消">
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
                    <!-- topic话题 -->
                    <a-form-item label="话题" name="topics" :rules="[{ required: true, message: '话题至少选择一个' }]">
                        <a-select v-model:value="formState.topics" mode="multiple" show-search style="width: 200px"
                            :options="topicStore.handleTopicList" :filter-option="filterOption" :listHeight="130"
                            :maxTagCount="3">
                            <template #option="{ value: val, label, icon }">
                                <div class="flex items-center">
                                    <span role="img" :aria-label="val">
                                        <img :src="icon" style="width: 20px" />
                                    </span>
                                    <span>&nbsp;&nbsp;{{ label }}</span>
                                </div>
                            </template>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { useQuestionStore } from "@/stores/question"
import { useTopicStore } from "@/stores/topic"
import type { CreateQuestionData } from "@/@types/api/question"
import type { FormInstance } from 'ant-design-vue';

const questionStore = useQuestionStore()
const topicStore = useTopicStore()
// 获取topicList
onMounted(async () => {
    await topicStore.GetTopicList()
})

// 创建路由器实例
const router = useRouter()
const route = useRoute()

// 获取form表单元素
const formRef = ref<FormInstance>();
interface FormState {
    title: string;
    descriptions: string;
    topics: string[];
}
// 表单数据
const formState = reactive<FormState>({
    title: '',
    descriptions: '',
    topics: []
});

// select过滤函数
const filterOption = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// 对话框显示变量
const visible = ref(false);

const handleOk = () => {
    formRef.value!
        .validateFields()
        .then(async (values) => {
            values.topics = toRaw(values.topics)
            await questionStore.CreateQuestion(values as CreateQuestionData)
            visible.value = false;
            formRef.value!.resetFields()
        })
        .catch(info => {
            console.log('Failed:', info);
        });
};

const toLogin = () => {
    router.replace({ name: "Login" })
}
</script>

<style lang='css'>
.ant-modal-footer .ant-btn-primary {
    border: none !important;
    background-color: rgb(71 85 105) !important;
}
</style>