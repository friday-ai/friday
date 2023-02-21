import { SceneAttributes, SceneCreationAttributes, SceneCreationKeys } from '@friday-ai/shared';
import BaseModel from '../../utils/database/model.base';
import SceneModel from '../../models/scene';

/**
 * Scene
 */
export default class Scene extends BaseModel<SceneModel, SceneAttributes, SceneCreationAttributes> {
  constructor() {
    super(SceneModel, SceneCreationKeys);
  }
}
