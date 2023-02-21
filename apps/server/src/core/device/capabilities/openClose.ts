import { DcstAttributes, DevicesActions } from '@friday-ai/shared';
import logger from '@friday-ai/logger';
import DeviceClass from '../device';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';

export const options: CapabilityManagerParamsList = {
  openClose: {
    actions: [DevicesActions.OPEN, DevicesActions.CLOSE],
  },
};

const ACCEPTED_BOOL_VALUE = [true, false, 1, 0];

function checkBoolValue(val: boolean | number) {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    const message = `The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

/**
 * openClose device capability
 * @param args
 */
export async function openClose(this: DeviceClass, args: { id: string; value: boolean }): Promise<DcstAttributes> {
  checkBoolValue(args.value);

  return this.exec(args.id, {
    action: args.value ? DevicesActions.OPEN : DevicesActions.CLOSE,
    params: { value: args.value },
  });
}
