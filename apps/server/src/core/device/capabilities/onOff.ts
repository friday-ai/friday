import { DevicesActions, checkBoolValue, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setOnOff: {
    actions: [DevicesActions.TURN_ON, DevicesActions.TURN_OFF],
  },
};

/**
 * OnOff device capability
 * @param args
 */
export async function setOnOff(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkBoolValue(args.params.value);

  return this.exec({
    action: args.params.value ? DevicesActions.TURN_ON : DevicesActions.TURN_OFF,
    emitter: args.emitter,
    capability: args.capability,
    emitterId: args.emitterId,
    params: args.params,
  });
}
