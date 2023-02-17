<template>
  <div>
    <!-- 时间 -->
    <div class="text-4xl text-center mb-12">{{ time }}</div>
    <!-- 个人信息框 -->
    <PersonalInfo></PersonalInfo>
    <!-- 右侧底部新闻 -->
    <News></News>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import dayjs from "dayjs";
import PersonalInfo from "./personalInfo/index.vue";
import News from "./News/index.vue";

const time = ref(dayjs(new Date()).format("HH:mm:ss"));

setInterval(() => {
  time.value = dayjs(new Date()).format("HH:mm:ss");
}, 1000);
</script>

<style lang="" scoped></style>
