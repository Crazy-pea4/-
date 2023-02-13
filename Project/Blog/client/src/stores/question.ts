import { defineStore } from "pinia";
import {
  type Props,
  getQuestionList,
  getQuestion,
  getQuestionCollectedList,
} from "@/api/question";
import { createQuestion, deleteQuestion } from "@/api/question";
import type { CreateQuestionData } from "@/@types/api/question";
// import transformTime from "@/utils/transformTime";
import type { QuestionList } from "@/@types/store/home";
import dayjs from "dayjs";

export const useQuestionStore = defineStore("question", {
  /**
   *  state，储存全局状态
   *  1. 必须是函数，为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   *  2. 必须是箭头函数，为了修改数据时更好的ts类型推断
   */
  state: () => ({
    questionList: [] as QuestionList[],
    searchList: [] as QuestionList[],
    question: {} as QuestionList,
    collectedList: [] as QuestionList[],
  }),
  getters: {},
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
    async GetQuestionCollectedList() {
      const {
        data: { data },
      } = await getQuestionCollectedList();
      this.collectedList = data;
    },
    async GetQuestion(questionId: string) {
      try {
        const {
          data: { data },
        } = await getQuestion(questionId);
        this.question = data;
      } catch (err) {
        console.log(err);
      }
    },
    async GetSearchList(props: Props) {
      try {
        const {
          data: { data: searchList },
        } = await getQuestionList(props);
        this.searchList = searchList.reverse();
      } catch (err) {
        console.log(err);
      }
    },
    async CreateQuestion(createQuestionData: CreateQuestionData) {
      const time = dayjs(new Date()).format("YYYY-M-D HH:mm");
      try {
        createQuestionData.createdAt = time;
        createQuestionData.updatedAt = time;
        await createQuestion(createQuestionData);
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
        this.GetQuestionCollectedList();
      } catch (err) {
        console.log(err);
      }
    },
  },
});
