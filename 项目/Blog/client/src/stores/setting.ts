import { defineStore } from "pinia";
import { getUser } from "@/api/user";
import type { UserSetting } from "@/@types/store/setting";

export const useSettingStore = defineStore("setting", {
  state: () => ({
    userSetting: {} as UserSetting,
  }),
  getters: {},
  actions: {
    async updateUserSetting(id: string) {
      const {
        data: { data },
      } = await getUser(id);
      this.userSetting = data;
    },
  },
});
