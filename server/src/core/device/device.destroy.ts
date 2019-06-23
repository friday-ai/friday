import Device from '../../models/device';
import Log from '../../utils/log';
const logger = new Log();

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
