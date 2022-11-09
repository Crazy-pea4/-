import request from "@/utils/request";
interface Data {
  phoneNumber: string;
  password: string;
}

export function login(data: Data) {
  return request({
    url: "/auth",
    method: "POST",
    data,
  });
}

export function isValid(token: string) {
  return request({
    url: "/auth",
    method: "GET",
    headers: { token },
  });
}
