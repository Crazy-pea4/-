import request from "@/utils/request";
import type { CreateAnswerData } from "@/@types/api/answer";

export function getAnswerList(questionId: string) {
  return request({
    url: `/question/${questionId}/answer`,
    method: "GET",
  });
}

export function createAnswer(
  questionId: string,
  createAnswerData: CreateAnswerData
) {
  return request({
    url: `/question/${questionId}/answer`,
    method: "POST",
    data: createAnswerData,
  });
}

export function deleteAnswer(questionId: string, answerId: string) {
  return request({
    url: `/question/${questionId}/answer/${answerId}`,
    method: "DELETE",
  });
}
