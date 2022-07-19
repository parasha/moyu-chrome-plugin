// import Axios, {AxiosRequestConfig} from "axios";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

class Reqeuest {

  private baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(url: string, query?: {[key: string]: string}): Promise<string> {
    let fetchUrl = `${this.baseUrl}${url}`;
    // 处理参数
    if (query) {
    const queryKeys = Object.keys(query);
      fetchUrl += '?'
      queryKeys.forEach(key => {
        fetchUrl += `${key}=${query[key]}`;
      });
      fetchUrl = fetchUrl.slice(fetchUrl.length - 1);
    }
    // 发起请求
    const res = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    return this.responseInterceptor(res);
  }

  async post(url: string, body?: {[key: string]: string}) {
    const fetchUrl = `${this.baseUrl}${url}`;

    const res = await fetch(fetchUrl, {
      method: 'POST',
      body: body? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    });

    return this.responseInterceptor(res);
  }

  async responseInterceptor(response: Response) {
    if(response.ok) {
      return response.text();
    } else {
      return Promise.reject({ msg: response.statusText });
    }
  }

}

// axios 在打包之后发起get请求有问题，换成原生的fetch试试
export const createRequest = (baseURL = "") => {
  return new Reqeuest(baseURL);
};

// export const createRequest = (baseURL = "", config: AxiosRequestConfig) => {
//   const axios = Axios.create({
//     baseURL: baseURL,
//     withCredentials: true,
//     timeout: 10000,
//     headers: headers,
//     xsrfCookieName: undefined,
//     ...config,
//   });

//   // 请求拦截
//   axios.interceptors.request.use((config) => {
//     return config;
//   }, error => {
//     console.log('请求报错：', error);
//   });

//   // 响应拦截
//   axios.interceptors.response.use(
//     (res) => {
//       return Promise.resolve(res.data);
//     },
//     (res) => {
//       console.log('响应报错：', res);
//       if (res.response) {
//         // 错误提示
//         return Promise.reject({ msg: res.response.statusText });
//       } else {
//         // 默认的错误提示
//         return Promise.reject({ msg: "网络错误，请稍后再试。" });
//       }
//     }
//   );

//   return axios;
// };
