<template>
    <div class="h-full bg-zinc-100 flex flex-col justify-center items-center">
        <!-- （头部）个人信息 -->
        <UserInfo></UserInfo>
        <!-- （主体）用户收藏、点赞等信息 -->
        <UserCollected></UserCollected>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import UserInfo from './UserInfo/index.vue'
import UserCollected from './UserCollections/index.vue'

</script>

<style lang='css' scoped>

</style>