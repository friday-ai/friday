import apiInstance from '../apiInstance';
import { SceneType } from '../../../utils/interfaces';

class Scenes {
  readonly api: typeof apiInstance;

  constructor(api: typeof apiInstance) {
    this.api = api;
  }

  getAll = async (): Promise<SceneType[]> => {
    const result = await this.api.get<SceneType[]>('/api/v1/scene');
    return result.data;
  };

  patch = async (scene: SceneType): Promise<SceneType> => {
    const result = await this.api.patch<SceneType>('/api/scene', scene, { id: scene.id });
    return result.data;
  };

  delete = async (scene: SceneType): Promise<{ success: boolean }> => {
    const result = await this.api.remove('/api/scene', { id: scene.id });
    return result.data;
  };
}

export default Scenes;
