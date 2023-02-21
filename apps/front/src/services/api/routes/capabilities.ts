import HttpClient from '../HttpClient';
import DemoClient from '../DemoClient';

class Capabilities {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  setState = async (id: string, params: { action: string; value: boolean | number }): Promise<{ success: boolean }> => {
    return this.api.post(`/api/v1/capability/${id}`, params);
  };
}

export default Capabilities;
