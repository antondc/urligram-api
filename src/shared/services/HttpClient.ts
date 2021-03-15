import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { stringify } from 'qs';

export const DEFAULT_ASYNC_ERROR = {
  message: 'An error ocurred',
  statusCode: 500,
  category: 'Error',
};

class HttpClient {
  private static instance: AxiosInstance;

  constructor() {
    const axiosInstance = axios.create({
      baseURL: process.env.ENDPOINT_API,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axiosInstance.defaults.paramsSerializer = this.paramsSerializer;
    axiosInstance.defaults.withCredentials = true;

    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (err) => Promise.reject(err?.response?.data?.error || DEFAULT_ASYNC_ERROR)
    );

    HttpClient.instance = axiosInstance;
  }

  public static getInstance = () => {
    if (!HttpClient.instance) new HttpClient();

    return HttpClient.instance;
  };

  private paramsSerializer = (params) => stringify(params, { arrayFormat: 'comma' });
}

export default HttpClient.getInstance();
