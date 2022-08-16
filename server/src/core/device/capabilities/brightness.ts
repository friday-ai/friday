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
  const capability = await this.getCapabilityById(args.id);

  const state = await this.setCapabilityState({
    capabilityId: capability.id,
    value: args.value.toString(),
  });

  await this.exec(capability, { action: DevicesActionsType.SET_BRIGHTNESS, params: { value: args.value } });

  return state;
}
