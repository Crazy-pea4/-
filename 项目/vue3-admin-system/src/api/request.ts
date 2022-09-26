import server from "../utils/server";

interface LoginAndRegisterData {
  account: string;
  password: string;
}

// 登录接口
export function login(data: LoginAndRegisterData) {
  return server({
    url: "/users",
    method: "GET",
    data,
  });
}

// 注册接口
export function register(data: LoginAndRegisterData) {
  return server({
    url: "/users",
    method: "POST",
    data,
  });
}

// 获取湛江天气接口
export function getWeather() {
  return server({
    url: "https://devapi.qweather.com/v7/weather/now",
    method: "GET",
    params: {
      key: "e6e5e0f66a0740b28b4215d7d6d3f798",
      location: 101280301,
    },
  });
}
