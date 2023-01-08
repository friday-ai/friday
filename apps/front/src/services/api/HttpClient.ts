import axios, { AxiosError } from 'axios';
import Auth from '../auth/auth';
import store from '../store/store';

type Methods = 'get' | 'post' | 'patch' | 'delete';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10);

class HttpClient {
  private readonly auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  private async executeRequest<T>(method: Methods, url: string, query = {}, body = {}, retryCount = 0): Promise<T> {
    store.dispatch({ type: 'app/setServerOffline', payload: false });
    store.dispatch({ type: 'app/setLoading', payload: true });

    if (retryCount >= 3) {
      await this.auth.logout();
      throw new Error('MAX_RETRY_EXCEEDED');
    }
    try {
      const { data }: { data: T } = await axios({
        method,
        url,
        baseURL: `http://localhost:${port}`,
        params: query,
        data: body,
        headers: this.auth.getHeaders(),
      });

      store.dispatch({ type: 'app/setLoading', payload: false });
      return data;
    } catch (e: unknown) {
      const error = e as AxiosError;
      if (error && error.response?.status === 401) {
        await this.auth.refreshToken();
        return this.executeRequest(method, url, query, body, retryCount + 1);
      }

      if (error && error.response?.status === 0) {
        store.dispatch({ type: 'app/setServerOffline', payload: true });
      }
      store.dispatch({ type: 'app/setLoading', payload: false });

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
