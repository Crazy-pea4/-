// 用户注册参数
export interface userRegisterData {
  nickname: string;
  phoneNumber: string;
  password: string;
}

// 用户登录参数
export interface authLoginData {
  phoneNumber: string;
  password: string;
}
