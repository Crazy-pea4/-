import request from "@/utils/request";

export function getQuestionList() {
  return request({
    url: "/question",
    method: "GET",
  });
}
