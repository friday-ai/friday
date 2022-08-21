import DeviceClass from './device';
import DeviceCapability from '../../models/device_capability';
import { DeviceCapabilityType } from '../../config/entities';
import { NotFoundError } from '../../utils/decorators/error';

/**
 * Get device capability by id
 */
export default async function getCapabilityById(this: DeviceClass, id: string, scope: string): Promise<DeviceCapabilityType> {
  let capability;

  if (scope !== '' && scope !== null && scope !== undefined) {
    capability = await DeviceCapability.scope(scope).findByPk(id);
  } else {
    capability = await DeviceCapability.findByPk(id);
  }

  if (capability === null) {
    throw new NotFoundError({ name: 'Friday get capability by id', message: 'Capability not found', metadata: id });
  }

  return <DeviceCapabilityType>capability?.get({ plain: true });
}
