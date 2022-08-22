import DeviceClass from '../device';
import {DeviceCapabilityStateType} from '../../../config/entities';
import {DevicesActionsType} from '../../../config/device';
import {CapabilityManagerParamsList, Color} from '../../../utils/interfaces';

export const options: CapabilityManagerParamsList = {
  color: {
    actions: [DevicesActionsType.COLOR],
  },
  coldWarm: {
    actions: [DevicesActionsType.COLD, DevicesActionsType.WARM],
  },
};

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

function checkRange(name: string, color: number) {
  if (color > RGB_MAX_VALUE || color < RGB_MIN_VALUE) {
    throw new Error(`The color ${name} must be in this range 0 to 255, actual is ${color}`);
  }
}

function checkRGB(rgb: Color) {
  checkRange('red', rgb.red);
  checkRange('blue', rgb.blue);
  checkRange('green', rgb.green);
}

/**
 * color device capability
 * @param args
 */
async function color(this: DeviceClass, args: { id: string, value: Color }): Promise<DeviceCapabilityStateType> {
  checkRGB(args.value);

  return await this.exec(
      args.id, {
        action: DevicesActionsType.COLOR, params: { value: args.value },
      }
  );
}

/**
 * coldWarm device capability
 * @param args
 *
 * if args.value = 1 then cold method else warm method
 */
async function coldWarm(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {

  return await this.exec(
      args.id, {
        action: args.value ? DevicesActionsType.COLD : DevicesActionsType.WARM, params: {},
      }
  );
}

export {
  color,
  coldWarm
}
