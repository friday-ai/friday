import Scene from '../../models/scene';
import SceneType from './scene.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all scenes.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<SceneType[]>} Resolve with scene array.
 * @example
 * ````
 * friday.scene.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<SceneType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let scenes;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      scenes = await Scene.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      scenes = await Scene.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const scenesPlain = <SceneType[]>scenes.map((scene) => {
      const scenePlain = scene.get({ plain: true });
      return scenePlain;
    });

    return scenesPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
