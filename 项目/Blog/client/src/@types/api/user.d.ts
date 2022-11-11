export interface registerData {
  phoneNumber: string;
  nickname: string;
  password: string;
  gender?: string;
  introduction?: string;
  area?: string;
}

export interface editData {
  phoneNumber?: string;
  nickname?: string;
  password?: string;
  gender?: string;
  introduction?: string;
  area?: string;
}
