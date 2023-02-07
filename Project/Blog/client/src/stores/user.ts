import { defineStore } from "pinia";
import {
  getUser,
  editUser,
  logOff,
  collectingQuestions,
  uncollectingQuestions,
} from "@/api/user";
import { uploadAvatar } from "@/api/upload";
import type { UserSetting } from "@/@types/store/setting";
// 来自useQuestionStore的问候
import { useQuestionStore } from "@/stores/question";
const questionStore = useQuestionStore();

export const useUserStore = defineStore("user", {
  state: () => ({
    userSetting: {} as UserSetting,
  }),
  getters: {},
  actions: {
    async GetUser(id: string) {
      try {
        const {
          data: { data },
        } = await getUser(id);
        this.userSetting = data;
      } catch (err) {
        console.log(err);
      }
    },
    async EditUser(id: string, userSetting: any) {
      try {
        await editUser(id, userSetting);
        await this.GetUser(id);
      } catch (err) {
        console.log(err);
      }
    },
    async LogOff(id: string) {
      try {
        const {
          data: { data },
        } = await logOff(id);
        console.log(data, 123123);
      } catch (err) {
        console.log(err);
      }
    },
    async UploadAvatar(id: string, file: FormData) {
      try {
        const res = await uploadAvatar(id, file);
        console.log(res);
        this.GetUser(id);
      } catch (err) {
        console.log(err);
      }
    },
    async CollectingQuestions(questionId: string) {
      try {
        await collectingQuestions(questionId);
        await questionStore.GetQuestion(questionId);
      } catch (err) {
        console.log(err);
      }
    },
    async UncollectingQuestions(questionId: string) {
      try {
        await uncollectingQuestions(questionId);
        await questionStore.GetQuestion(questionId);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
