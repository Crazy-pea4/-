<template>
    <Calendar :attributes='attrs' class="" />
</template>

<script setup lang='ts'>
import "v-calendar/dist/style.css";
import { ref, reactive } from 'vue'
import { Calendar } from 'v-calendar';

const attrs = ref([
    {
        key: 'today',
        dates: new Date(),
        // highlight: 'blue',
        // popover 点亮的日期上出现提示内容
        popover: {
            label: '今天也要加油鸭',
        },
        bar: 'blue'
    }
])
</script>

<style lang='css' scoped>

</style>