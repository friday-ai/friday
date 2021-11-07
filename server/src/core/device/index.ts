import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';
import StateClass from '../state/index';
import getAvailableFeatures from './subdevice/subdevice.getFeatures';
import error from '../../utils/errors/coreError';
import { DeviceTypeParameter, FeatureParameter } from '../../utils/interfaces';
import getFeatures from './features/features.helper';
import checkAvailableFeature from './features/checkAvailableFeature';
import { EventsType, MqttMessageTypes, TopicsTypes } from '../../utils/constants';
import Event from '../../utils/event';

/**
 * Device
 */
export default class Device {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;

  public state: StateClass;
  private event: Event;

  constructor(event: Event, state: StateClass) {
    this.event = event;
    this.state = state;
  }

  public async sendCommand(action: string, params: DeviceTypeParameter) {
    try {
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
        const { deviceClass, deviceType, ...newPayload } = paramFeature;

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
    } catch (e) {
      throw error({
        name: e.name, message: e.message, cause: e, metadata: { action, params },
      });
    }
  }
}
