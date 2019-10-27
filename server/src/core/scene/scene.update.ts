import Scene from '../../models/scene';
import SceneType from './scene.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Update a scene.
 * @param {SceneType} scene - A scene object.
 * @returns {Promise<SceneType>} Resolve with updated scene.
 * @example
 * ````
 * friday.scene.update({
 *   id: '30967a17-8e13-4460-afa0-1069fa890c4e'
 *   name: 'scene update'
 * });
 * ````
 */
export default async function update(scene: SceneType): Promise<SceneType> {
  try {
    const sceneToUpdate = await Scene.findByPk(scene.id);

    if (sceneToUpdate === null) {
      throw new NotFoundError({name: 'Update an Scene', message: 'Scene not found', metadata: scene.id});
    }
    sceneToUpdate.update(scene);
    let sceneToReturn = <SceneType>sceneToUpdate.get({ plain: true });
    return sceneToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: scene});
  }
}
