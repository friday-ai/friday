import { DcAttributes } from '@friday-ai/shared';
import DeviceClass from './device';
import DeviceCapability from '../../models/device_capability';
import { NotFoundError } from '../../utils/decorators/error';

/**
 * Get device capability by id
 */
export default async function getCapabilityById(this: DeviceClass, id: string, scope: string): Promise<DcAttributes> {
  let capability;

  if (scope !== '' && scope !== null && scope !== undefined) {
    capability = await DeviceCapability.scope(scope).findByPk(id);
  } else {
    capability = await DeviceCapability.findByPk(id);
  }

  if (capability === null) {
    throw new NotFoundError({ name: 'Friday get capability by id', message: 'Capability not found', metadata: id });
  }

  return <DcAttributes>capability.get({ plain: true });
}
