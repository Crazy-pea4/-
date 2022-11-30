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

export function likeAnswer(
  questionId: string,
  answerId: string,
  flag: boolean
) {
  return request({
    url: `/user/likeAnswer/${questionId}/${answerId}`,
    method: flag === true ? "PUT" : "DELETE",
  });
}

export function hesitateAnswer(
  questionId: string,
  answerId: string,
  flag: boolean
) {
  return request({
    url: `/user/hesitateAnswer/${questionId}/${answerId}`,
    method: flag === true ? "PUT" : "DELETE",
  });
}

export function clearIsLikesAndIsHesitation(
  questionId: string,
  answerId: string
) {
  return request({
    url: `/user/clearIsLikesAndIsHesitation/${questionId}/${answerId}`,
    method: "GET",
  });
}
