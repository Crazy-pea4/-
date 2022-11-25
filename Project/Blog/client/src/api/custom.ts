import request from "@/utils/request";

export function getIpInfo() {
  return request({
    url: "https://ip.useragentinfo.com/json",
    method: "GET",
    baseURL: "",
  });
}

// 有跨域限制
export function getNewsList() {
  return request({
    url: "http://localhost:5050/news",
    method: "GET",
    baseURL: "",
  });
}
