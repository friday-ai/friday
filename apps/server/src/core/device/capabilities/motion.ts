import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';
import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setMotion: {
    actions: [DevicesActionsType.SET_MOTION],
  },
};

const ACCEPTED_BOOL_VALUE = [
  true,
  false,
  1,
  0,
];

function checkBoolValue(val: any) {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    const message = `The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

export async function setMotion(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {
  checkBoolValue(args.value);
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_MOTION, params: { value: args.value },
    },
  );
}
