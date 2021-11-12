import { expect } from 'chai';
import Device from '../../../src/core/device';
import { DEVICE_SUBTYPE_FEATURE_LIST, DEVICE_TYPE_COMMON_FEATURE } from '../../../src/utils/device.constants';
import { AvailableState } from '../../../src/utils/constants';

let device: Device;

describe('Device.sendCommand', () => {
  before(async () => {
    // @ts-ignore
    device = global.FRIDAY.device;
  });

  it('should power on light by sending command to a plugin', async () => {
    let message = 'no-error';
    try {
      const stateBefore = await device.state.getByOwner('22b5b9ce-cd9e-404a-8c31-97350d684fd3');
      expect(stateBefore.value).equal(AvailableState.DEVICE_POWER_ON);

      await device.sendCommand(DEVICE_TYPE_COMMON_FEATURE.LIGHT.POWER_OFF, {
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        state: AvailableState.DEVICE_POWER_OFF,
      });

      const stateAfter = await device.state.getByOwner('22b5b9ce-cd9e-404a-8c31-97350d684fd3');
      expect(stateAfter.value).equal(AvailableState.DEVICE_POWER_OFF);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not power on on non existing device', async () => {
    let message = 'no-error';
    try {
      await device.sendCommand(DEVICE_TYPE_COMMON_FEATURE.LIGHT.POWER_OFF, {
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684f',
        state: AvailableState.DEVICE_POWER_OFF,
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('Device not found');
  });

  it('should not set hue on a light SIMPLE device', async () => {
    let message = 'no-error';
    try {
      await device.sendCommand(DEVICE_SUBTYPE_FEATURE_LIST.LIGHT.RGB.SET_HUE, {
        deviceId: '28500f8d-40d3-4b66-84e2-356fa93c997e',
        state: {
          red: 255,
          blue: 213,
          green: 0,
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('This device do not support this feature setHue');
  });

  it('should not command a device without type or subtype', async () => {
    let message = 'no-error';
    try {
      await device.sendCommand(DEVICE_SUBTYPE_FEATURE_LIST.LIGHT.RGB.SET_HUE, {
        deviceId: '5e7383ed-4bef-471a-a96b-9277cab75c34',
        state: {
          red: 255,
          blue: 213,
          green: 0,
        },
      });
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('This device has no information about his type or subtype');
  });
});
