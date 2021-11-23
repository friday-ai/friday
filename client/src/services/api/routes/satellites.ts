import apiInstance from '../apiInstance';
import { SatelliteType } from '../../../utils/interfaces';

class Satellites {
  readonly api: typeof apiInstance;

  constructor(api: typeof apiInstance) {
    this.api = api;
  }

  getAll = async (): Promise<SatelliteType[]> => {
    const result = await this.api.get<SatelliteType[]>('/api/v1/satellite');
    return result.data;
  };
}

export default Satellites;
