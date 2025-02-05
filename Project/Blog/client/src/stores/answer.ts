import { defineStore } from "pinia";
import type { AnswerList } from "@/@types/store/question";
import {
  getAnswerList,
  getAnswerLikedList,
  createAnswer,
  deleteAnswer,
} from "@/api/answer";
import {
  likeAnswer,
  hesitateAnswer,
  clearIsLikesAndIsHesitation,
} from "@/api/user";
import type { CreateAnswerData } from "@/@types/api/answer";
import dayjs from "dayjs";

export const useAnswerStore = defineStore("answer", {
  state: () => ({
    answerList: [] as AnswerList[],
    likedList: [] as AnswerList[],
  }),
  getters: {},
  actions: {
    async GetAnswerList(questionId: string) {
      try {
        const {
          data: { data },
        } = await getAnswerList(questionId);
        this.answerList = data;
      } catch (err) {
        console.log(err);
      }
    },
    async GetAnswerLikedList() {
      try {
        const {
          data: { data },
        } = await getAnswerLikedList();
        this.likedList = data[0].likesAnswers;
      } catch (err) {
        console.log(err);
      }
    },
    async CreateAnswer(questionId: string, createAnswerData: CreateAnswerData) {
      const time = dayjs(new Date()).format("YYYY-M-D HH:mm");
      try {
        createAnswerData.createdAt = time;
        createAnswerData.updatedAt = time;
        const {
          data: { data },
        } = await createAnswer(questionId, createAnswerData);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async DeleteAnswer(questionId: string, answerId: string) {
      try {
        await deleteAnswer(questionId, answerId);
        this.GetAnswerList(questionId);
      } catch (err) {
        console.log(err);
      }
    },
    async LikeAnswer(questionId: string, answerId: string, flag: boolean) {
      try {
        await likeAnswer(questionId, answerId, flag);
        await this.GetAnswerLikedList();
      } catch (err) {
        console.log(err);
      }
    },
    async HesitateAnswer(questionId: string, answerId: string, flag: boolean) {
      try {
        await hesitateAnswer(questionId, answerId, flag);
        await this.GetAnswerLikedList();
      } catch (err) {
        console.log(err);
      }
    },
    async ClearIsLikesAndIsHesitation(questionId: string, answerId: string) {
      try {
        await clearIsLikesAndIsHesitation(questionId, answerId);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
