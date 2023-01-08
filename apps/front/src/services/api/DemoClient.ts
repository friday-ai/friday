import JsonFile from '../../config/demo.json';

type JsonFileType = typeof JsonFile;
type JsonFileKeys = keyof JsonFileType;

class DemoClient {
  private response = {
    data: {},
    status: 200,
    statusText: '200 OK',
    headers: {},
    config: {},
  };

  // eslint-disable-next-line class-methods-use-this
  async get<T>(url: string, _query = {}): Promise<T> {
    const key = `get ${url}` as JsonFileKeys;
    if (!JsonFile[key]) {
      throw new Error(`${key} not found in demo.json`);
    }

    const data = JsonFile[key] as never as T;
    return Promise.resolve(data);
  }

  async post<T>(url: string, body = {}): Promise<T> {
    const key = `post ${url}` as JsonFileKeys;

    if (!JsonFile[key]) {
      this.response.data = body || {};
      return Promise.resolve(this.response.data as never);
    }

    const data = JsonFile[key] as never as T;
    return Promise.resolve(data);
  }

  async patch<T>(_url: string, body = {}): Promise<T> {
    this.response.data = body || {};
    return Promise.resolve(this.response.data as never);
  }

  async delete<T>(_url: string, _query = {}): Promise<T> {
    this.response.data = { success: true };
    return Promise.resolve(this.response.data as never);
  }
}

export default DemoClient;
