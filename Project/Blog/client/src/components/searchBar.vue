<template>
    <!-- 搜索框 -->
    <div class="2xl:w-2/5 xl:w-2/5 lg:w-2/5 p-3 fixed z-10 left-1/2 -translate-x-1/2 hover:-translate-y-0 transition-all duration-300"
        :class="{ '-translate-y-9': flag }" v-if="$route.meta.isShowSearchBar">
        <a-input class="w-full h-8 border-2 border-slate-600 rounded-lg text-sm ring-1" allow-clear type="text"
            v-model:value="searchInpVal" @press-enter="search">
            <template #prefix>
                <search-outlined />
            </template>
        </a-input>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { notification } from 'ant-design-vue';
import { useQuestionStore } from "@/stores/question";
import useMouseScrollTopHooks from "@/hooks/useMouseScrollTopHooks";
import { SearchOutlined } from "@ant-design/icons-vue";
// 创建router实例
const router = useRouter();
// 创建componentStore
const questionStore = useQuestionStore();

// 搜索框上移下移标识
const flag = useMouseScrollTopHooks();
// 搜索框值（关键词）
const searchInpVal = ref("");

const search = () => {
    if (searchInpVal.value) {
        const props = {
            keyword: searchInpVal.value,
            limit: 10,
            page: 0,
        };
        questionStore.GetSearchList(props);
        // 将keyword存入sessionStore，防止搜索页在刷新时丢失数据
        sessionStorage.setItem("keyword", searchInpVal.value);
        searchInpVal.value = "";
        router.push({ name: "Search" });
    } else {
        notification.warning({ message: '请输入内容搜索', duration: 2 })
    }

};
</script>

<style lang="css" scoped>

</style>
