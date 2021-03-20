import axios, { AxiosInstance } from 'axios';
import https from 'https';

import { QueryStringWrapper } from './QueryStringWrapper';

interface Options {
  timeout: number;
}

export const DEFAULT_ASYNC_ERROR = {
  message: 'An error ocurred',
  statusCode: 500,
  category: 'Error',
};

export class HttpClient {
  private static staticInstance: AxiosInstance;
  public publicInstance: AxiosInstance;

  constructor(options?: Options) {
    const axiosInstance = axios.create({
      baseURL: process.env.ENDPOINT_API,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    axiosInstance.defaults.timeout = options?.timeout;
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axiosInstance.defaults.paramsSerializer = this.paramsSerializer;
    axiosInstance.defaults.withCredentials = true;

    axiosInstance.interceptors.response.use(
      (response) => response.data,
      (err) => Promise.reject(err?.response?.data?.error || DEFAULT_ASYNC_ERROR)
    );

    HttpClient.staticInstance = axiosInstance;
    this.publicInstance = axiosInstance;
  }

  public static getInstance = (): AxiosInstance => {
    if (!HttpClient.staticInstance) new HttpClient();

    return HttpClient.staticInstance;
  };

  private paramsSerializer = (params) => QueryStringWrapper.stringifyQueryParams(params);
}

export default HttpClient.getInstance();
