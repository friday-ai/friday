import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Destroy a satellite.
 * @param {String} id - Id of satellite.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.satellite.destroy('ac21d402-35a9-4cbc-8ea9-33a2cff93b7a');
 * ````
 */
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
