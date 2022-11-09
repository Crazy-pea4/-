import axios from "axios";
import nprogress from "nprogress";
import { message } from "ant-design-vue";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    nprogress.start();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    nprogress.done();
    message.success(response.data.message, 1);
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 500:
          message.error("服务器错误，请联系管理员", 0);
          break;
        case 400:
          message.error(error.response.data.message);
      }
    } else {
      message.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;
