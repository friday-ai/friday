import BaseModel from '../../utils/database/model.base';
import SceneModel from '../../models/scene';
import { SceneType } from '../../config/entities';

/**
 * Scene
 */
export default class Scene extends BaseModel<SceneModel, SceneType> {
  constructor() {
    super(SceneModel);
  }
}
