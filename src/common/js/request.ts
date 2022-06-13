import Axios, {AxiosRequestConfig} from "axios";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const createRequest = (baseURL = "", config: AxiosRequestConfig) => {
  const axios = Axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 10000,
    headers: headers,
    xsrfCookieName: undefined,
    ...config,
  });

  // 请求拦截
  axios.interceptors.request.use((config) => {
    return config;
  });

  // 响应拦截
  axios.interceptors.response.use(
    (res) => {
      return Promise.resolve(res.data);
    },
    (res) => {
      if (res.response) {
        // 错误提示
        return Promise.reject({ msg: res.response.statusText });
      } else {
        // 默认的错误提示
        return Promise.reject({ msg: "网络错误，请稍后再试。" });
      }
    }
  );

  return axios;
};
