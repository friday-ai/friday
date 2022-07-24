import DeviceCapabilityState from '../../models/device_capability_state';
import DeviceClass from './device';
import { DeviceCapabilityStateType } from '../../config/entities';
import logger from '../../utils/log';

/**
 * Device capability state
 * @param state
 */
export default async function setCapabilityState(this: DeviceClass, state: Omit<DeviceCapabilityStateType, 'id'>): Promise<DeviceCapabilityStateType> {
  // Check if old state exist
  const existingState = await DeviceCapabilityState.findOne({
    where: {
      capabilityId: state.capabilityId,
      last: true,
    },
  });

  // If old state exist, update it
  if (existingState !== null) {
    const plainStateToUpdate = <DeviceCapabilityStateType>(
      existingState.get({ plain: true })
    );
    plainStateToUpdate.last = false;
    await existingState.update(plainStateToUpdate);
  }

  // And then, create the new state
  const newState = await DeviceCapabilityState.create({ ...state });

  logger.success(
    `State ${newState.value} created for capability ${newState.id}`,
  );

  return <DeviceCapabilityStateType>newState.get({ plain: true });
}
