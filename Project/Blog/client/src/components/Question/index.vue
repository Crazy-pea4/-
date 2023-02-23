<template>
  <div class="w-full h-auto float-left" @click="ToQuestion">
    <a-skeleton active :loading="loading">
      <!-- 列表中的每一项 -->
      <template v-if="questionStore[props.storeType].length > 0">
        <div
          class="w-full h-36 border-2 border-gray-300 relative rounded-sm hover:shadow flex flex-col justify-around text-center cursor-pointer my-5 px-5 first:mt-0 last:mb-0"
          v-for="(item, index) in questionStore[props.storeType]" :key="item._id" :data-questionId="item._id">
          <!-- 删除按钮 -->
          <a-popconfirm title="确认要删除吗？" cancel-text="取消" ok-text="确认" @confirm="deleteQuestion(item._id)">
            <div class="absolute top-0 right-1 leading-6 text-xl w-6 h-6" :data-questionId="item._id" @click.stop>
              x
            </div>
          </a-popconfirm>
          <!-- 问题标题 -->
          <div class="text-3xl mt-2 truncate" :data-questionId="item._id">
            {{ item.title }}
          </div>
          <!-- 问题描述 -->
          <div class="truncate" :data-questionId="item._id">
            {{ item.descriptions }}
          </div>
          <!-- 提出问题的人的信息 -->
          <div class="flex justify-end items-end" :data-questionId="item._id">
            <!-- 发起者 -->
            <div class="text-sm mr-2">
              {{
                item.questioner === null
                ? "用户不存在"
                : item.questioner.nickname
              }}
            </div>
            <!-- 发起时间 -->
            <div class="text-xs">{{ item.createdAt }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div @click.stop>
          <NotFound></NotFound>
        </div>
      </template>
    </a-skeleton>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuestionStore } from "@/stores/question";
import NotFound from "@/components/NotFound/index.vue";

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  storeType: "collectedList" | "questionList" | "searchList";
}>();

const loading = ref(true);
const questionStore = useQuestionStore();
onMounted(async () => {
  switch (props.storeType) {
    case "collectedList":
      await questionStore.GetQuestionCollectedList();
      loading.value = false;
      break;
    case "questionList":
      await questionStore.GetQuestionList();
      loading.value = false;
      break;
    case "searchList":
      const props = { keyword: route.query.k as string, limit: 10, page: 0 };
      if (questionStore.searchList.length === 0) {
        await questionStore.GetSearchList(props);
      }
      loading.value = false;
  }
});

// 跳转路由
const ToQuestion = (e: any) => {
  router.push({
    name: "Question",
    query: {
      questionId: e.target.dataset.questionid as string,
      index: e.target.dataset.index as number,
    },
  });
};

// 删除问题
const deleteQuestion = (questionId: string) => {
  questionStore.DeleteQuestion(questionId);
};
</script>

<style lang="" scoped></style>
