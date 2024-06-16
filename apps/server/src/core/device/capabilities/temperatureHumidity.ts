import { DevicesActions, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setTemperatureOrHumidity: {
    actions: [DevicesActions.SET_TEMPERATURE, DevicesActions.SET_HUMIDITY],
  },
};

async function setTemperatureOrHumidity(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  return this.exec(args);
}

export { setTemperatureOrHumidity };
