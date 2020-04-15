import Device from '../../models/device';
import error, { NotFoundError } from '../../utils/errors/coreError';

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
      throw new NotFoundError({ name: 'Destoy a device', message: 'Device not found', metadata: id });
    }

    await deviceToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
