import Scene from '../../models/scene';
import SceneType from './scene.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(scene: SceneType): Promise<SceneType> {
  try {
    const sceneToUpdate = await Scene.findByPk(scene.id);

    if (sceneToUpdate === null) {
      throw logger.error('Scene not found');
    }
    sceneToUpdate.update(scene);
    let sceneToReturn = <SceneType>sceneToUpdate.get({ plain: true });
    return sceneToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
