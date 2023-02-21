import HttpClient from '../HttpClient';
import { RoomType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Rooms {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  create = async (room: RoomType): Promise<RoomType> => {
    return this.api.post<RoomType>(`/api/v1/room`, room);
  };

  getAll = async (): Promise<RoomType[]> => {
    return this.api.get<RoomType[]>('/api/v1/room', { scope: 'full' });
  };

  patch = async (room: RoomType): Promise<RoomType> => {
    return this.api.patch<RoomType>(`/api/v1/room/${room.id}`, room);
  };

  delete = async (room: RoomType): Promise<{ success: boolean }> => {
    return this.api.delete(`/api/v1/room/${room.id}`);
  };
}

export default Rooms;
