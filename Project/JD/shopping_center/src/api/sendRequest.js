// 对axios的二次封装
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 利用axios的create方法创建一个axios实例，对它进行一些自定义配置
const sendRequest = axios.create({
  baseURL: "http://gmall-h5-api.atguigu.cn/api",
  timeout: 3000,
});
// 获取仓库
import store from "../store";
// 为自定义axios实例添加请求拦截器
sendRequest.interceptors.request.use((config) => {
  // 进度条开始
  nprogress.start();
  // console.log(config);
  if (store.state.detail.uuidToken) {
    config.headers.userTempId = store.state.detail.uuidToken;
  }
  if (localStorage.getItem("token")) {
    config.headers.token = localStorage.getItem("token");
  }
  return config;
});
// 响应拦截器
sendRequest.interceptors.response.use(
  (response) => {
    // 进度条结束
    nprogress.done();
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default sendRequest;
