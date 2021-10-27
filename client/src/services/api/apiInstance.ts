import axios, { AxiosResponse } from 'axios';
import demoApi from './demoApi';
import { getHeaders } from './auth';
import setupInterceptorsTo from './interceptors';

const { PROD } = import.meta.env;

setupInterceptorsTo(axios);

const api = PROD
  ? axios.create({
      baseURL: window.location.origin,
      headers: getHeaders(),
    })
  : demoApi;

const get = async <T>(url: string, params = {}): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, { params });
};

const post = async <T>(url: string, data: T): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data);
};

const patch = async <T>(url: string, data: T, params = {}): Promise<AxiosResponse<T>> => {
  return api.patch<T>(url, data, { params });
};

// delete declaration is not allowed in strict mode
const remove = async (url: string, params = {}): Promise<AxiosResponse> => {
  return api.delete(url, { params });
};

export default { get, post, patch, remove };
