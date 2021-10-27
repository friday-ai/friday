import { AxiosRequestConfig, AxiosResponse } from 'axios';
import JsonFile from '../../config/demo.json';

type JsonFileType = typeof JsonFile;
type JsonFileKeys = keyof JsonFileType;

const response = {
  data: {},
  status: 200,
  statusText: '200 OK',
  headers: {},
  config: {},
};

class demoApi {
  static async get<T = never, R = AxiosResponse<T>>(url: string, _config?: AxiosRequestConfig<T>): Promise<R> {
    const key = `get ${url}` as JsonFileKeys;
    if (!JsonFile[key]) {
      throw new Error(`${key} not found in demo.json`);
    }

    response.data = (JsonFile[key] as never) as T;
    return Promise.resolve(response as never);
  }

  static post<T = never, R = AxiosResponse<T>>(url: string, data?: T, _config?: AxiosRequestConfig<T>): Promise<R> {
    const key = `post ${url}` as JsonFileKeys;

    if (!JsonFile[key]) {
      response.data = data || {};
      return Promise.resolve(response as never);
    }

    response.data = (JsonFile[key] as never) as T;
    return Promise.resolve(response as never);
  }

  static patch<T = never, R = AxiosResponse<T>>(_url: string, data?: T, _config?: AxiosRequestConfig<T>): Promise<R> {
    response.data = data || {};
    return Promise.resolve(response as never);
  }

  static delete<T = never, R = AxiosResponse<T>>(_url: string, _config?: AxiosRequestConfig<T>): Promise<R> {
    response.data = { success: true };
    return Promise.resolve(response as never);
  }
}

export default demoApi;
