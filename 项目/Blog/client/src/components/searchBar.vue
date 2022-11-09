<template>
    <!-- 搜索框 -->
    <div class="w-96 xl:w-96 p-3 fixed z-10 left-1/2 -translate-x-1/2 hover:-translate-y-0 transition-all duration-300"
        :class="{'-translate-y-10': flag }" v-if="$route.meta.isShowSearchBar">
        <a-input class="w-full h-8 border-2 border-sky-500 rounded-lg text-sm ring-1" allow-clear type="text">
            <template #prefix>
                <search-outlined />
            </template>
        </a-input>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import useMouseScrollTopHooks from '@/hooks/useMouseScrollTopHooks'
import { SearchOutlined } from '@ant-design/icons-vue'

const flag = useMouseScrollTopHooks()

</script>

<style lang='css' scoped>

</style>