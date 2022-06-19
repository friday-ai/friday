import StateClass from '../state/state';
import EventClass from '../../utils/event';
import BaseModel from '../../utils/database/model.base';
import DeviceModel from '../../models/device';
import { DeviceType } from '../../config/entities';
import { Catch } from '../../utils/decorators/error';

import { DeviceTypeParameter, FeatureParameter } from '../../utils/interfaces';
import { AvailableState, EventsType, MqttMessageTypes, StateOwner, TopicsTypes } from '../../config/constants';

import getFeatures from './features/features.helper';
import checkAvailableFeature from './features/checkAvailableFeature';
import getAvailableFeatures from './subdevice/subdevice.getFeatures';
/**
 * Device
 */
export default class Device extends BaseModel<DeviceModel, DeviceType> {
  public state: StateClass;
  private event: typeof EventClass;

  constructor(event: typeof EventClass, state: StateClass) {
    super(DeviceModel);
    this.event = event;
    this.state = state;
  }

  @Catch()
  async create(data: Omit<DeviceType, 'id'>) {
    const device = await super.create(data);

    // Set default state for device
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_WAITING_CONFIGURATION,
      last: true,
    });

    return device;
  }

  @Catch()
  async sendCommand(action: string, params: DeviceTypeParameter) {
    const device = await this.getById(params.deviceId, 'withPlugin');

    checkAvailableFeature(device, action);

    const featureList = getAvailableFeatures(device.type!, device.subType!);

    const features = await getFeatures(device.type!, featureList);

    const paramFeature: FeatureParameter = {
      deviceType: device,
      deviceClass: this,
      state: params.state,
    };

    if (device.plugin !== undefined && device.plugin.satelliteId !== undefined) {
      const { ...newPayload } = paramFeature;

      const message = {
        receiver: device.plugin.satelliteId,
        message: {
          device: device.id,
          method: action,
          params: newPayload,
        },
        type: MqttMessageTypes.MESSAGE_SEND,
        topic: TopicsTypes.PLUGIN_EXEC,
      };

      this.event.emit(EventsType.MQTT_PUBLISH, message);
    }

    return features[action](paramFeature);
  }
}
