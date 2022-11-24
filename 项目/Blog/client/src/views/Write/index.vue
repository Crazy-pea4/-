<template>
    <div class="bg-gray-100">
        <div class="text-lg bg-white flex mt-4 pl-4">
            <div @click="router.back()" class="flex items-center float-left cursor-pointer">
                <rollback-outlined class="mr-2" /> 返回
            </div>
        </div>
        <!-- 顶部编辑菜单栏 -->
        <div class="flex justify-center border-b-2 bg-white">
            <Toolbar class="" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        </div>
        <!-- 编辑区域 -->
        <div class="w-sHeart 2xl:w-heart xl:w-sHeart  relative left-1/2 -translate-x-1/2 mt-10 mx-0"
            style="height: 800px">
            <Editor style="border: 1px solid #ccc; overflow-y: hidden;" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="handleCreated" />
        </div>
        <!-- 底部菜单栏 -->
        <div class="w-full h-16 bg-slate-600 bg-opacity-60 flex justify-center fixed z-30 bottom-0">
            <div class="w-sHeart flex justify-end items-center">
                <div class="w-32 h-10 bg-neutral-600 text-white rounded-full cursor-pointer text-lg flex justify-center items-center"
                    @click="submit">
                    提交博客
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, ref, shallowRef, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// 引入声明类型
import type { IDomEditor } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
// 引入ant-vue小图标icon
import { RollbackOutlined } from '@ant-design/icons-vue';
// 路由实力
const router = useRouter()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
let editor: IDomEditor
nextTick(() => {
    editor = editorRef.value
})

// mode: "default" | "simple"
const mode = ref("default")

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 提交按钮方法
const submit = () => {
    const html = editor.getHtml()
    console.log(html);
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style lang='' scoped>

</style>