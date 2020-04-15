import Scene from '../../models/scene';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Destroy a scene.
 * @param {String} id - Id of scene.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.scene.destroy('36707443-fba9-4fbd-9aa6-4715f5a63ff9');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const sceneToDelete = await Scene.findByPk(id);

    if (sceneToDelete === null) {
      throw new NotFoundError({ name: 'Destroy an Scene', message: 'Scene not found', metadata: id });
    }

    await sceneToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
