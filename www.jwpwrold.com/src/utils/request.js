import { removeToken } from "@/utils/auth";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
// import { Session } from '/@/utils/storage';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  // headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    let token = localStorage.getItem("login-Token") || "";
    if (token) {
      // (config.headers).common['token'] = token;
      config.headers["token"] = token;
    }
    let language = localStorage.getItem("language") || "1";
    if (language) {
      // config.headers["language"] = language;
      config.params = { ...config.params, language: language };
    }
   
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    const code = response.data.code;
    if (code == 0) {
      return res;
    } else if (code === 401) {
      ElMessageBox.alert("登录状态已过期，请重新登录", "提示", {
        confirmButtonText: "确定",
      })
        .then(() => {
          // Session.clear(); // 清除浏览器全部临时缓存
          removeToken();
          window.location.href = "/login"; // 去登录页
        })
        .catch(() => {});
    } else {
      ElMessage.error(res.msg);
      return Promise.reject(new Error(res.msg));
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else {
      if (error.response && error.response.data)
        ElMessage.error(error.response.statusText);
      else ElMessage.error("接口路径找不到");
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default service;
