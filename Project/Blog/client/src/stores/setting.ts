import { defineStore } from "pinia";
import { getUser } from "@/api/user";
import { uploadAvatar } from "@/api/upload";
import type { UserSetting } from "@/@types/store/setting";

export const useSettingStore = defineStore("setting", {
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
    async UploadAvatar(id: string, file: FormData) {
      try {
        const res = await uploadAvatar(id, file);
        console.log(res);
        this.GetUser(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
