<template>
    <div class="min-h-screen pt-20 flex justify-center">
        <ListBg>
            <template #body>
                <Question storeType="searchList"></Question>
            </template>
        </ListBg>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import NotFound from "@/components/NotFound/index.vue"
import ListBg from "@/components/ListBg/index.vue"
import Question from "@/components/Question/index.vue"


</script>

<style lang='css' scoped>

</style>