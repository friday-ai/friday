import { DevicesActions, checkIfIsANumber, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setConsumption: {
    actions: [DevicesActions.SET_POWER_CONSUMPTION, DevicesActions.SET_INTENSITY_CONSUMPTION, DevicesActions.SET_WATER_CONSUMPTION],
  },
};

async function setConsumption(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkIfIsANumber(args.params.value);
  return this.exec(args);
}

export { setConsumption };
