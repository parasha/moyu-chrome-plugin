// import Axios, {AxiosRequestConfig} from "axios";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

class Reqeuest {

  private baseUrl;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(url: string, query?: {[key: string]: string}, config = {headers}): Promise<string> {
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
      ...config
    });

    return this.responseInterceptor(res);
  }

  async post(url: string, body?: any, config = {headers}) {
    const fetchUrl = `${this.baseUrl}${url}`;

    const res = await fetch(fetchUrl, {
      method: 'POST',
      body: body ? typeof body === 'string' ? body : JSON.stringify(body) : undefined,
      ...config
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
