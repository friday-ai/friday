import { DevicesActions, checkBoolValue, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setMotion: {
    actions: [DevicesActions.SET_MOTION],
  },
};

export async function setMotion(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkBoolValue(args.params.value);

  return this.exec(args);
}
