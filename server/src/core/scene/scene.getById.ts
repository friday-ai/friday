import Scene from '../../models/scene';
import SceneType from './scene.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Get a scene by id.
 * @param {String} id - Id of scene.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<SceneType>} Resolve with scene.
 * @example
 * ````
 * friday.scene.getById('d0766a83-68e7-44aa-9124-f8e5fa137304', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<SceneType> {
  try {

    let scene;

    if (scope !== '' && scope !== null && scope !== undefined) {
      scene = await Scene.scope(scope).findByPk(id);
    } else {
      scene = await Scene.findByPk(id);
    }

    if (scene === null) {
      throw new NotFoundError({name: 'Get Scene by Id', message: 'Scene not found', metadata: id});
    }

    let sceneToReturn = <SceneType>scene.get({ plain: true });

    return sceneToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
