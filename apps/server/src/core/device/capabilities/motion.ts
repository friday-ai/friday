import { DcstAttributes, DevicesActions } from '@friday-ai/shared';
import logger from '@friday-ai/logger';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import DeviceClass from '../device';

export const options: CapabilityManagerParamsList = {
  setMotion: {
    actions: [DevicesActions.SET_MOTION],
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

export async function setMotion(this: DeviceClass, args: { id: string; value: boolean }): Promise<DcstAttributes> {
  checkBoolValue(args.value);
  return this.exec(args.id, {
    action: DevicesActions.SET_MOTION,
    params: { value: args.value },
  });
}
