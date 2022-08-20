import Device from '../../models/device';
import DeviceClass from './device';
import { NotFoundError } from '../../utils/decorators/error';

/**
 * Destroy device
 * @param identifier
 */
export default async function destroy(this: DeviceClass, identifier: string): Promise<void> {
  const deviceToDestroy = await Device.findByPk(identifier);

  if (deviceToDestroy === null) {
    throw new NotFoundError({ name: 'Friday destroy', message: 'Device not found', metadata: identifier });
  }

  // TODO: remove all capabilities
  return deviceToDestroy.destroy();
}
