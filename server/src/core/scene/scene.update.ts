import Scene from '../../models/scene';
import SceneType from './scene.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a scene.
 * @param {String} id - Id of scene
 * @param {SceneType} scene - A scene object.
 * @returns {Promise<SceneType>} Resolve with updated scene.
 * @example
 * ````
 * friday.scene.update(
 * '30967a17-8e13-4460-afa0-1069fa890c4e',
 * {
 *   id: '30967a17-8e13-4460-afa0-1069fa890c4e'
 *   name: 'scene update'
 * });
 * ````
 */
export default async function update(id: string, scene: SceneType): Promise<SceneType> {
  try {
    const sceneToUpdate = await Scene.findByPk(id);

    if (sceneToUpdate === null) {
      throw new NotFoundError({ name: 'Update an Scene', message: 'Scene not found', metadata: scene.id });
    }
    await sceneToUpdate.update(scene);
    const sceneToReturn = <SceneType>sceneToUpdate.get({ plain: true });
    return sceneToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: scene,
    });
  }
}
