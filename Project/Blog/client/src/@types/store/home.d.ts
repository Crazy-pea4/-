import type { TopicList } from "@/@types/store/topic";
export interface QuestionList {
  [p: string]: string;
  _id: string;
  title: string;
  descriptions: string;
  topics: TopicList[];
  createdAt: string;
  updatedAt: string;
  questioner: {
    _id: string;
    nickname: string;
    phoneNumber: string;
    avatarUrl: string;
  };
  isCollected: boolean;
  questionCollector: [
    {
      _id: string;
      nickname: string;
      phoneNumber: string;
      avatarUrl: string;
    }
  ];
}
