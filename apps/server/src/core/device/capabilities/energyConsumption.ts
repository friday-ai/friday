import logger from "@friday-ai/logger";
import { type DcstAttributes, DevicesActions } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setPowerConsumption: {
    actions: [DevicesActions.SET_POWER_CONSUMPTION],
  },
  setIntensityConsumption: {
    actions: [DevicesActions.SET_INTENSITY_CONSUMPTION],
  },
  setWaterConsumption: {
    actions: [DevicesActions.SET_WATER_CONSUMPTION],
  },
};

function checkValueType(val: number) {
  if (Number.isNaN(Number(val))) {
    const message = `The value must be a number, actual format is ${typeof val} : ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

async function setPowerConsumption(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  checkValueType(args.value);
  return this.exec(args.id, {
    action: DevicesActions.SET_POWER_CONSUMPTION,
    params: { value: args.value },
  });
}

async function setIntensityConsumption(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  checkValueType(args.value);
  return this.exec(args.id, {
    action: DevicesActions.SET_INTENSITY_CONSUMPTION,
    params: { value: args.value },
  });
}

async function setWaterConsumption(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  checkValueType(args.value);
  return this.exec(args.id, {
    action: DevicesActions.SET_WATER_CONSUMPTION,
    params: { value: args.value },
  });
}

export { setPowerConsumption, setIntensityConsumption, setWaterConsumption };
