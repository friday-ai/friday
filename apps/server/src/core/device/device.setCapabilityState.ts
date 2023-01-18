import { DcstAttributes, DcstCreationAttributes } from '@friday/shared';
import logger from '@friday/logger';
import DeviceCapabilityState from '../../models/device_capability_state';
import DeviceClass from './device';
import { BadParametersError } from '../../utils/decorators/error';

/**
 * Device capability state
 * @param state
 */
export default async function setCapabilityState(this: DeviceClass, state: DcstCreationAttributes): Promise<DcstAttributes> {
  if (state.capabilityId === '' || state.capabilityId === undefined || state.capabilityId === null) {
    throw new BadParametersError({ name: 'Friday set capability state', message: 'Capability id is empty', metadata: state });
  }

  // TODO: check if state value is valid for capability

  // Check if old state exist
  const existingState = await DeviceCapabilityState.findOne({
    where: {
      capabilityId: state.capabilityId,
      last: true,
    },
  });

  // If old state exist, update it
  if (existingState !== null) {
    existingState.last = false;
    await existingState.save();
  }

  // And then, create the new state
  const newState = await DeviceCapabilityState.create(state);

  logger.success(`State ${newState.value} created for capability ${newState.id}`);

  return <DcstAttributes>newState.get({ plain: true });
}
