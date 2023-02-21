import HttpClient from '../HttpClient';
import { HouseType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Houses {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  create = async (house: HouseType): Promise<HouseType> => {
    return this.api.post<HouseType>(`/api/v1/house`, house);
  };

  getAll = async (): Promise<HouseType[]> => {
    return this.api.get<HouseType[]>('/api/v1/house', { scope: 'full' });
  };

  patch = async (house: HouseType): Promise<HouseType> => {
    return this.api.patch<HouseType>(`/api/v1/house/${house.id}`, house);
  };

  delete = async (house: HouseType): Promise<{ success: boolean }> => {
    return this.api.delete(`/api/v1/house/${house.id}`);
  };
}

export default Houses;
