import request from "@/utils/request";
interface Data {
  phoneNumber: string;
  password: string;
}
export function isValid() {
  return request({
    url: "/auth",
    method: "GET",
  });
}
export function login(data: Data) {
  return request({
    url: "/auth",
    method: "POST",
    data,
  });
}
