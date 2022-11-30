import axios from "axios";
import nprogress from "nprogress";
import { message } from "ant-design-vue";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.method !== "get" && !config.url?.match(/auth/)) {
      message.success("操作成功！");
    }
    // 过滤从网上找来api，不给它加token
    if (config.baseURL!.match(/\/api/)) {
      config.headers!["token"] = localStorage.getItem("token");
    }
    nprogress.start();
    return config;
  },
  function (error) {
    nprogress.start();
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    nprogress.done();
    // switch (response.data.code) {
    //   case 200:
    //     message.success(response.data.message, 0.8);
    //     break;
    // }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message.error("服务器错误，请联系管理员", 0);
          break;
        case 401:
          message.error("登录鉴权不通过，请重新登陆后重试");
        case 400:
          message.error(error.response.data.message);
          break;
      }
    } else {
      message.error(error.message);
    }
    nprogress.done();
    return Promise.reject(error);
  }
);

export default instance;
