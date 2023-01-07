<template>
    <div class="w-full rounded-lg border-dashed flex flex-col text-xs">
        <!-- 访问所在地 -->
        <div class="flex justify-center">
            <div class="mr-2">
                ip: {{ ipInfo.ip }}
            </div>
            <div>{{ ipInfo.isp }}</div>
        </div>
        <!-- 供应商和ip地址 -->
        <div class="flex mt-2 justify-center">
            <div class="mr-2">{{ ipInfo.area }}</div>
            <div>{{ ipInfo.city }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import useCustomStore from "@/stores/custom"
import { storeToRefs } from 'pinia'
// 创建自定义功能仓库
const customStore = useCustomStore()
const { ipInfo } = storeToRefs(customStore)

onMounted(() => {
    customStore.UpdateIpInfo()
})

</script>

<style lang='' scoped>

</style>