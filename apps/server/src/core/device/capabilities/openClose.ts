import { DevicesActions, checkBoolValue, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  openClose: {
    actions: [DevicesActions.OPEN, DevicesActions.CLOSE],
  },
};

/**
 * openClose device capability
 * @param args
 */
export async function openClose(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkBoolValue(args.params.value);

  return this.exec({
    action: args.params.value ? DevicesActions.OPEN : DevicesActions.CLOSE,
    emitter: args.emitter,
    capability: args.capability,
    emitterId: args.emitterId,
    params: args.params,
  });
}
