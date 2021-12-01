import HttpClient from '../HttpClient';
import { SatelliteType } from '../../../utils/interfaces';

class Satellites {
  readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  getAll = async (): Promise<SatelliteType[]> => {
    return this.api.get<SatelliteType[]>('/api/v1/satellite', { scope: 'full' });
  };
}

export default Satellites;
