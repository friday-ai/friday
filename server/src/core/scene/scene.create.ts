import Scene from '../../models/scene';
import SceneType from './scene.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Create a scene.
 * @param {SceneType} scene - A scene object.
 * @returns {Promise<SceneType>} Resolve with created scene.
 * @example
 * ````
 * friday.scene.create({
 *    id: 'e49c0809-7f51-4f0c-842f-36461b7bd18a',
 *    name: 'Sample scene',
 *    description: 'A sample to create a scene'
 * });
 * ````
 */
export default async function create(scene: SceneType): Promise<SceneType> {
  try {
    const createdScene = await Scene.create(scene);
    let sceneToReturn = <SceneType>createdScene.get({ plain: true });
    return sceneToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
