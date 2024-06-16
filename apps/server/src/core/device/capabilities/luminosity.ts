import { DevicesActions, checkIfIsANumber, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setLuminosity: {
    actions: [DevicesActions.SET_LUMINOSITY],
  },
};

export async function setLuminosity(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkIfIsANumber(args.params.value);
  return this.exec(args);
}
