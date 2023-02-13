<template>
    <div class="relative w-9/12 min-h-screen p-4 rounded-md bg-black bg-opacity-40">
        <slot name="head"></slot>
        <slot name="body"></slot>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'

</script>

<style lang='' scoped>

</style>