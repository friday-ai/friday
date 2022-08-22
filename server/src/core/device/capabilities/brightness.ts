import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';

export const options: CapabilityManagerParamsList = {
  setBrightness: {
    actions: [DevicesActionsType.SET_BRIGHTNESS],
  },
};

/**
 * Brightness device capability
 * @param args
 */
export async function setBrightness(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  return await this.exec(
      args.id, {
        action: DevicesActionsType.SET_BRIGHTNESS, params: { value: args.value }
      }
  );
}
