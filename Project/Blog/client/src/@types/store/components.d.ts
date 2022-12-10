export interface SearchList {
  _id: string;
  title: string;
  descriptions: string;
  questioner: {
    _id: string;
    avatarUrl: string;
    nickname: string;
    phoneNumber: string;
  };
  topics: string[];
  createdAt: string;
  updatedAt: string;
}
