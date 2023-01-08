import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';
import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setLuminosity: {
    actions: [DevicesActionsType.SET_LUMINOSITY],
  },
};

function checkValueType(val: number) {
  if (isNaN(val)) {
    const message = `The value must be a number, actual format is ${typeof val} : ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

export async function setLuminosity(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  checkValueType(args.value);
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_LUMINOSITY, params: { value: args.value },
    },
  );
}
