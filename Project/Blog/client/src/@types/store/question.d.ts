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
  isLikes: boolean;
  hesitation: number;
  isHesitation: boolean;
  createdAt: string;
  updatedAt: string;
}
