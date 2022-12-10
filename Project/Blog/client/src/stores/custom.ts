import { defineStore } from "pinia";
import { getIpInfo, getNewsList } from "@/api/custom";
import type { IpInfo } from "@/@types/store/custom";

export default defineStore("custom", {
  state: () => ({
    ipInfo: {} as IpInfo,
    newsList: [] as any[],
  }),
  getters: {},
  actions: {
    async UpdateIpInfo() {
      try {
        const { data } = await getIpInfo();
        this.ipInfo = data;
      } catch (err) {
        console.log(err);
      }
    },
    async UpdateNewsList() {
      try {
        // T1467284926140这个是网易新闻api设置的字段，不知未来是否会改变
        let {
          data: { T1467284926140 },
        } = await getNewsList();
        T1467284926140.splice(10);
        this.newsList = T1467284926140;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
