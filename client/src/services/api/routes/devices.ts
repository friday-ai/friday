import HttpClient from '../HttpClient';
import { DeviceType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Devices {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  getAll = async (): Promise<DeviceType[]> => {
    return this.api.get<DeviceType[]>('/api/v1/device', { scope: 'full' });
  };
}

export default Devices;
