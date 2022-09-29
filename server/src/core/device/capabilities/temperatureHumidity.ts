import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DevicesActionsType } from '../../../config/device';
import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';

export const options: CapabilityManagerParamsList = {
  setTemperature: {
    actions: [DevicesActionsType.SET_TEMPERATURE],
  },
  setHumidity: {
    actions: [DevicesActionsType.SET_HUMIDITY],
  },
};

async function setTemperature(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_TEMPERATURE, params: { value: args.value },
    },
  );
}

async function setHumidity(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_HUMIDITY, params: { value: args.value },
    },
  );
}

export {
  setTemperature,
  setHumidity,
};
