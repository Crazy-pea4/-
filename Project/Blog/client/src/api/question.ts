import request from "@/utils/request";
import type { CreateQuestionData } from "@/@types/api/question";

export function getQuestionList() {
  return request({
    url: "/question",
    method: "GET",
  });
}

export function createQuestion(createQuestionData: CreateQuestionData) {
  return request({
    url: "/question",
    method: "POST",
    data: createQuestionData,
  });
}
