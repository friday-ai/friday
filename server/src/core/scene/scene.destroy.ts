import Scene from '../../models/scene';
import Log from '../../utils/log';
const logger = new Log();

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
