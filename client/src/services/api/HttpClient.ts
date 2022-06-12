import axios, { AxiosError } from 'axios';
import { AuthHookType } from '../auth/AuthProvider';

type Methods = 'get' | 'post' | 'patch' | 'delete';

class HttpClient {
  private readonly auth: AuthHookType;

  constructor(auth: AuthHookType) {
    this.auth = auth;
  }

  private async executeRequest<T>(method: Methods, url: string, query = {}, body = {}, retryCount = 0): Promise<T> {
    if (retryCount >= 3) {
      await this.auth.logout();
      throw new Error('MAX_RETRY_EXCEEDED');
    }
    try {
      const { data }: { data: T } = await axios({
        method,
        url,
        baseURL: 'http://localhost:3000',
        params: query,
        data: body,
        headers: this.auth.getHeaders(),
      });

      return data;
    } catch (e: unknown) {
      const error = e as AxiosError;
      if (error && error.response?.status === 401) {
        await this.auth.refreshToken();
        return this.executeRequest(method, url, query, body, retryCount + 1);
      }
      throw e;
    }
  }

  async get<T>(url: string, query = {}): Promise<T> {
    return this.executeRequest<T>('get', url, query);
  }

  async post<T>(url: string, body = {}): Promise<T> {
    return this.executeRequest<T>('post', url, {}, body);
  }

  async patch<T>(url: string, body = {}): Promise<T> {
    return this.executeRequest<T>('patch', url, {}, body);
  }

  async delete<T>(url: string, query = {}): Promise<T> {
    return this.executeRequest<T>('delete', url, query);
  }
}

export default HttpClient;
