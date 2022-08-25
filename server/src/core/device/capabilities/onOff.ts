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
  return this.exec(
    args.id, {
      action: args.value ? DevicesActionsType.TURN_ON : DevicesActionsType.TURN_OFF,
      params: { value: args.value },
    },
  );
}
