import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';
import { checkBrightnessRange } from '../../../utils/checkCapabilitiesValue';

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
  checkBrightnessRange(args.value);

  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_BRIGHTNESS, params: { value: args.value },
    },
  );
}
