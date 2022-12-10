import request from "@/utils/request";
import type { CreateQuestionData } from "@/@types/api/question";

export interface Props {
  limit: number;
  page: number;
  keyword: string;
}

export function getQuestionList(props?: Props) {
  if (!props) {
    return request({
      url: "/question",
      method: "GET",
    });
  } else {
    return request({
      url: `/question?keyword=${props.keyword}&limit=${props.limit}&page=${props.page}`,
      method: "GET",
    });
  }
}

export function getQuestionCollectedList() {
  return request({
    url: "/question/collection",
    method: "GET",
  });
}

export function getQuestion(questionId: string) {
  return request({
    url: `/question/${questionId}`,
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

export function deleteQuestion(questionId: String) {
  return request({
    url: `/question/${questionId}`,
    method: "DELETE",
  });
}
