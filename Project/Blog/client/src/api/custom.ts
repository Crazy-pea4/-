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
    url: import.meta.env.VITE_NEWS_API,
    method: "GET",
    baseURL: "",
  });
}
