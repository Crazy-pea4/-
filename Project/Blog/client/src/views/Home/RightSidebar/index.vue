<template>
    <div>
        <!-- 时间 -->
        <Time />
        <!-- 日历 -->
        <Calendar />
        <!-- Ip显示 -->
        <Ip />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Calendar from './Calendar/index.vue'
import Ip from './Ip/index.vue'
import Time from './Time/index.vue'

</script>

<style lang='' scoped>

</style>