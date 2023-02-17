import { defineStore } from "pinia";
import type { TopicList, AntSelectList } from "@/@types/store/topic";
import { getTopicList } from "@/api/topic";

export const useTopicStore = defineStore("topic", {
  state: () => ({
    topicList: [] as TopicList[],
  }),
  getters: {
    handleTopicList(): AntSelectList[] {
      const antSelectList = [] as AntSelectList[];
      for (const i of this.topicList) {
        antSelectList.push({
          value: i._id,
          label: i.topicName,
          icon: i.topicPic,
        });
      }
      return antSelectList;
    },
  },
  actions: {
    async GetTopicList() {
      try {
        const {
          data: { data },
        } = await getTopicList();
        this.topicList = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
