import { DevicesActions, DcstAttributes } from '@friday/shared';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import DeviceClass from '../device';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setLuminosity: {
    actions: [DevicesActions.SET_LUMINOSITY],
  },
};

function checkValueType(val: number) {
  if (Number.isNaN(val)) {
    const message = `The value must be a number, actual format is ${typeof val} : ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

export async function setLuminosity(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  checkValueType(args.value);
  return this.exec(args.id, {
    action: DevicesActions.SET_LUMINOSITY,
    params: { value: args.value },
  });
}
