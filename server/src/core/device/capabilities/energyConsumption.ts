import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';
import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setPowerConsumption: {
    actions: [DevicesActionsType.SET_POWER_CONSUMPTION],
  },
  setIntensityConsumption: {
    actions: [DevicesActionsType.SET_INTENSITY_CONSUMPTION],
  },
  setWaterConsumption: {
    actions: [DevicesActionsType.SET_WATER_CONSUMPTION],
  },
};

function checkValueType(val: number) {
  if (isNaN(val)) {
    const message = `The value must be a number, actual format is ${typeof val} : ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

async function setPowerConsumption(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  checkValueType(args.value);
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_POWER_CONSUMPTION, params: { value: args.value },
    },
  );
}

async function setIntensityConsumption(
  this: DeviceClass,
  args: { id: string, value: number },
): Promise<DeviceCapabilityStateType> {
  checkValueType(args.value);
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_INTENSITY_CONSUMPTION, params: { value: args.value },
    },
  );
}

async function setWaterConsumption(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  checkValueType(args.value);
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_WATER_CONSUMPTION, params: { value: args.value },
    },
  );
}

export {
  setPowerConsumption,
  setIntensityConsumption,
  setWaterConsumption,
};
