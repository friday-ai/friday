import Scene from '../../models/scene';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name scene.desrtoy
 * @description Destroy a scene.
 * @param {String} id - Id of scene.
 * @returns {Promise<void>}
 * @example
 * friday.scene.destroy('36707443-fba9-4fbd-9aa6-4715f5a63ff9');
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const sceneToDelete = await Scene.findByPk(id);

    if (sceneToDelete === null) {
      throw logger.error('Scene not found');
    }

    await sceneToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
