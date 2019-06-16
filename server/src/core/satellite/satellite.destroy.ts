import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(id: string): Promise<void> {
  try {
    const satelliteToDelete = await Satellite.findByPk(id);

    if (satelliteToDelete === null) {
      throw logger.error('Satellite not found');
    }

    await satelliteToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
