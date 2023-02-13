import request from "@/utils/request";

export function getTopicList() {
  return request({
    url: "/topic",
    method: "GET",
  });
}
