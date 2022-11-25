import { defineStore } from "pinia";
import { getQuestionList } from "@/api/question";
import transformTime from "@/utils/transformTime";
import type { QuestionList } from "@/@types/store/home";

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
    async updateQuestionList() {
      try {
        const {
          data: { data: questionList },
        } = await getQuestionList();
        this.questionList = questionList.reverse();
      } catch (err) {
        console.log(err);
      }
    },
  },
});
