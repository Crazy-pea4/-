<template>
    <div class="text-4xl text-center mb-4">{{ time }}</div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'

let time = ref('')

setInterval(() => {
    time.value = dayjs(new Date()).format('HH:mm:ss')
}, 1000)



</script>

<style lang='' scoped>

</style>