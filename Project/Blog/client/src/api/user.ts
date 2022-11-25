import request from "@/utils/request";
import type { registerData, editData } from "@/@types/api/user";

export function register(data: registerData) {
  return request({
    url: "/user",
    method: "POST",
    data,
  });
}

export function editUser(id: string, data: editData) {
  return request({
    url: `/user/${id}`,
    method: "PATCH",
    data,
  });
}

export function getUser(id: string) {
  return request({
    url: `/user/${id}?detail=nickname;introduction;gender`,
    method: "GET",
  });
}
