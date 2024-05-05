import { type SceneAttributes, type SceneCreationAttributes, SceneCreationKeys } from "@friday-ai/shared";
import SceneModel from "../../models/scene";
import BaseModel from "../../utils/database/model.base";

/**
 * Scene
 */
export default class Scene extends BaseModel<SceneModel, SceneAttributes, SceneCreationAttributes> {
  constructor() {
    super(SceneModel, SceneCreationKeys);
  }
}
