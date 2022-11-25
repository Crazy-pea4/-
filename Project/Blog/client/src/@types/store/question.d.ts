export interface AnswerList {
  _id: string;
  content: string;
  answerer: {
    _id: string;
    avatarUrl: string;
    nickname: string;
    phoneNumber: string;
  };
  questionId: string;
  likes: number;
  hesitation: number;
  createdAt: string;
  updatedAt: string;
}
