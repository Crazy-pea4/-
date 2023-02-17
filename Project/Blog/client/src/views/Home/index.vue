<template>
  <div class="">
    <!-- 主体部分 -->
    <div class="flex justify-center mt-16">
      <!-- 问题记录列表 -->
      <ListBg class="w-9/12 min-h-screen p-4 rounded-md bg-black bg-opacity-40">
        <template #body>
          <Question storeType="questionList" />
        </template>
      </ListBg>
      <!-- <div class="w-9/12 min-h-screen p-4 rounded-md bg-black bg-opacity-40">
                <MainFloor />
            </div> -->
      <!-- 右侧边栏 -->
      <div class="relative ml-4">
        <RightSideBar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Question from "@/components/Question/index.vue";
import RightSideBar from "./RightSidebar/index.vue";
import ListBg from "@/components/ListBg/index.vue";
</script>

<style lang="css" scoped></style>
