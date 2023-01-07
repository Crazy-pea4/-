<template>
    <div>
        <!-- 时间 -->
        <Time />
        <!-- 日历 -->
        <!-- <Calendar /> -->
        <!-- 个人信息框 -->
        <PersonalInfo></PersonalInfo>
        <News></News>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import Calendar from './Calendar/index.vue'
import Time from './Time/index.vue'
import PersonalInfo from "./personalInfo/index.vue"
import News from './News/index.vue'

</script>

<style lang='' scoped>

</style>