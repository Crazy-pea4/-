import request from "@/utils/request";

export function getAnswerList(questionId: string) {
  return request({
    url: `/question/${questionId}/answer`,
    method: "GET",
  });
}
