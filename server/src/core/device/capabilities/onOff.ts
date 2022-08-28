import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { DevicesActionsType } from '../../../config/device';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setOnOff: {
    actions: [DevicesActionsType.TURN_ON, DevicesActionsType.TURN_OFF],
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

/**
 * OnOff device capability
 * @param args
 */
export async function setOnOff(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {
  checkBoolValue(args.value);

  return this.exec(
    args.id, {
      action: args.value ? DevicesActionsType.TURN_ON : DevicesActionsType.TURN_OFF,
      params: { value: args.value },
    },
  );
}
