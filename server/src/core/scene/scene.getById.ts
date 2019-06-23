import Scene from '../../models/scene';
import SceneType from './scene.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<SceneType> {
  try {

    let scene;

    if (scope !== '' && scope !== null && scope !== undefined) {
      scene = await Scene.scope(scope).findByPk(id);
    } else {
      scene = await Scene.findByPk(id);
    }

    if (scene === null) {
      throw logger.error('Scene not found');
    }

    let sceneToReturn = <SceneType>scene.get({ plain: true });

    return sceneToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
