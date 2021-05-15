import axios, { AxiosResponse, Method } from 'axios';

import  config from './../config/config.json';

const api = axios.create({
  baseURL: config.dev.baseURL,
});

const Request = <T>(
  method: Method,
  url: string,
  data: any,
  headers?: any,
): Promise<AxiosResponse<T>> => {
  return api.request<T>({
    method,
    url,
    data,
    headers,
  });
};

export default Request;