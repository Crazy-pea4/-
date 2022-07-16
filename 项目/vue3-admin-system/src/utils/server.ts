import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

// 使用环境变量自动分配baseURL。
const axiosURL = process.env.VUE_APP_API;
// if (process.env.NODE_ENV === "development") {
//   axiosURL = process.env.VUE_APP_API;
// } else {
//   axiosURL = process.env.VUE_APP_API;
// }
const server = axios.create({
  baseURL: axiosURL,
  timeout: 3000,
});
// 添加请求拦截器
server.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
server.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    switch (error.response.status) {
      case 404:
        ElMessage({
          message: "请求路径出错！",
          type: "error",
        });
        break;
      case 500:
        ElMessage({
          message: "服务器内部错误，请稍后再试！",
          type: "error",
        });
        break;
      default:
        ElMessage({
          message: "未知错误，请联系管理员",
          type: "error",
        });
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default server;
