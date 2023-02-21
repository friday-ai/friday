import HttpClient from '../HttpClient';
import DemoClient from '../DemoClient';

class System {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  init = async (): Promise<{ success: boolean }> => {
    return this.api.post(`/api/v1/system/init`);
  };

  getVersion = async (): Promise<Promise<string>> => {
    return this.api.get<string>('/api/v1/system');
  };
}

export default System;
