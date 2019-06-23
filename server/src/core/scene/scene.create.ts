import Scene from '../../models/scene';
import SceneType from './scene.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(scene: SceneType): Promise<SceneType> {
  try {
    const createdScene = await Scene.create(Scene);
    let sceneToReturn = <SceneType>createdScene.get({ plain: true });
    return sceneToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
