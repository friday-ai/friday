import Device from '../../models/device';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Destroy a device.
 * @param {String} id - Id of device.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.device.destroy('ffba6936-2ce0-411c-91c9-6f1dd6ed0b17');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const deviceToDelete = await Device.findByPk(id);

    if (deviceToDelete === null) {
      throw logger.error('Device not found');
    }

    await deviceToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
