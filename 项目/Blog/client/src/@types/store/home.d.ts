export interface QuestionList {
  [p: string]: string;
  _id: string;
  title: string;
  descriptions: string;
  createdAt: string;
  updatedAt: string;
  questioner: {
    _id: string;
    nickname: string;
    phoneNumber: string;
    avatarUrl: string;
  };
}
