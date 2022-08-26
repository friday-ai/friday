import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { DevicesActionsType } from '../../../config/device';
import { CapabilityManagerParamsList, Color } from '../../../utils/interfaces';
import { checkBoolValue, checkRGB } from '../../../utils/checkCapabilitiesValue';

export const options: CapabilityManagerParamsList = {
  color: {
    actions: [DevicesActionsType.COLOR],
  },
  coldWarm: {
    actions: [DevicesActionsType.COLD, DevicesActionsType.WARM],
  },
  colorTemp: {
    actions: [DevicesActionsType.COLOR_TEMP],
  },
  white: {
    actions: [DevicesActionsType.WHITE],
  },
};

/**
 * color device capability
 * @param args
 */
async function color(this: DeviceClass, args: { id: string, value: Color }): Promise<DeviceCapabilityStateType> {
  const rgb: Color = args.value;
  checkRGB(rgb);

  return this.exec(
    args.id, {
      action: DevicesActionsType.COLOR, params: { value: `${rgb.red}, ${rgb.green}, ${rgb.blue}` },
    },
  );
}

/**
 * coldWarm device capability
 * @param args
 *
 * if args.value = 1 then cold method else warm method
 */
async function coldWarm(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {
  checkBoolValue(args.value);

  return this.exec(
    args.id, {
      action: args.value ? DevicesActionsType.COLD : DevicesActionsType.WARM, params: { value: args.value },
    },
  );
}

/**
 * colorTemp device capability
 * @param args
 *
 */
async function colorTemp(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: DevicesActionsType.COLOR_TEMP, params: { value: args.value },
    },
  );
}

/**
 * white device capability
 * @param args
 *
 */
async function white(this: DeviceClass, args: { id: string, value: boolean | null }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: DevicesActionsType.WHITE, params: { value: '255, 255, 255' },
    },
  );
}

export {
  color,
  coldWarm,
  colorTemp,
  white,
};
