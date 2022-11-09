import request from "@/utils/request";
interface registerData {
  phoneNumber: string;
  nickname: string;
  password: string;
  gender?: string;
  introduction?: string;
  area?: string;
}

export function register(data: registerData) {
  return request({
    url: "/user",
    method: "POST",
    data,
  });
}
