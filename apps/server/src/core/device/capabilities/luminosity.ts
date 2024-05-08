import logger from "@friday-ai/logger";
import { type DcstAttributes, DevicesActions } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setLuminosity: {
    actions: [DevicesActions.SET_LUMINOSITY],
  },
};

function checkValueType(val: number) {
  if (Number.isNaN(Number(val))) {
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
