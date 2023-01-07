<template>
    <div class="text-4xl text-center mb-12">{{ time }}</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'

const time = ref(dayjs(new Date()).format('HH:mm:ss'))

setInterval(() => {
    time.value = dayjs(new Date()).format('HH:mm:ss')
}, 1000)



</script>

<style lang='' scoped>

</style>