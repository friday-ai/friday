import { DcstAttributes, DevicesActions } from '@friday/shared';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import DeviceClass from '../device';

export const options: CapabilityManagerParamsList = {
  setTemperature: {
    actions: [DevicesActions.SET_TEMPERATURE],
  },
  setHumidity: {
    actions: [DevicesActions.SET_HUMIDITY],
  },
};

async function setTemperature(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  return this.exec(args.id, {
    action: DevicesActions.SET_TEMPERATURE,
    params: { value: args.value },
  });
}

async function setHumidity(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  return this.exec(args.id, {
    action: DevicesActions.SET_HUMIDITY,
    params: { value: args.value },
  });
}

export { setTemperature, setHumidity };
