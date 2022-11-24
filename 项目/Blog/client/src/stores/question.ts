import { defineStore } from "pinia";
import type { AnswerList } from "@/@types/store/question";
import { getAnswerList } from "@/api/answer";

export const useQuestionStore = defineStore("question", {
  state: () => ({
    answerList: [] as AnswerList[],
  }),
  getters: {},
  actions: {
    async updateAnswerList(questionId: string) {
      const {
        data: { data },
      } = await getAnswerList(questionId);
      this.answerList = data;
    },
  },
});
