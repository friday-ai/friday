import HttpClient from '../HttpClient';
import { SceneType } from '../../../utils/interfaces';

class Scenes {
  readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  getAll = async (): Promise<SceneType[]> => {
    return this.api.get<SceneType[]>('/api/v1/scene', { scope: 'full' });
  };

  patch = async (scene: SceneType): Promise<SceneType> => {
    return this.api.patch<SceneType>(`/api/scene/${scene.id}`, scene);
  };

  delete = async (scene: SceneType): Promise<{ success: boolean }> => {
    return this.api.delete(`/api/scene/${scene.id}`);
  };
}

export default Scenes;
