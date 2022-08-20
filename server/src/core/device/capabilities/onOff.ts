import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { DevicesActionsType } from '../../../config/device';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';

export const options: CapabilityManagerParamsList = {
  setOnOff: {
    actions: [DevicesActionsType.TURN_ON, DevicesActionsType.TURN_OFF],
  },
};

/**
 * OnOff device capability
 * @param args
 */
export async function setOnOff(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {
  const capability = await this.getCapabilityById(args.id);

  const state = await this.setCapabilityState({
    capabilityId: capability.id,
    value: args.value ? 'ON' : 'OFF',
  });

  await this.exec(capability.deviceId!, { action: args.value ? DevicesActionsType.TURN_ON : DevicesActionsType.TURN_OFF, params: {} });

  return state;
}
