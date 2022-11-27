import { defineStore } from "pinia";
import { getQuestionList } from "@/api/question";
import { createQuestion, deleteQuestion } from "@/api/question";
import transformTime from "@/utils/transformTime";
import type { QuestionList } from "@/@types/store/home";

import dayjs from "dayjs";

export const useMainFloorStore = defineStore("mainFloor", {
  /**
   *  state，储存全局状态
   *  1. 必须是函数，为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   *  2. 必须是箭头函数，为了修改数据时更好的ts类型推断
   */
  state: () => ({
    questionList: [] as QuestionList[],
  }),
  getters: {
    // handelQuestionList(state) {
    //   state.questionList.map((question) => {
    //     transformTime(question);
    //   });
    // },
  },
  actions: {
    async GetQuestionList() {
      try {
        const {
          data: { data: questionList },
        } = await getQuestionList();
        this.questionList = questionList.reverse();
      } catch (err) {
        console.log(err);
      }
    },
    async CreateQuestion(values: any) {
      const time = dayjs(new Date()).format("YYYY-M-D HH:mm");
      try {
        values.createdAt = time;
        values.updatedAt = time;
        await createQuestion(values);
        // 新建问题后，再一次获取问题列表
        this.GetQuestionList();
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async DeleteQuestion(questionId: string) {
      try {
        await deleteQuestion(questionId);
        // 重新获取一次问题列表
        this.GetQuestionList();
      } catch (err) {
        console.log(err);
      }
    },
  },
});
