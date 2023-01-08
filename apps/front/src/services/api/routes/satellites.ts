import HttpClient from '../HttpClient';
import { SatelliteType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Satellites {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  getAll = async (): Promise<SatelliteType[]> => {
    return this.api.get<SatelliteType[]>('/api/v1/satellite', { scope: 'full' });
  };
}

export default Satellites;
