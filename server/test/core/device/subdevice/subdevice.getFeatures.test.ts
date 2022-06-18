import { assert, expect } from 'chai';
import getAvailableFeatures from '../../../../src/core/device/subdevice/subdevice.getFeatures';
import Device from '../../../../src/core/device/device';

let device: Device;

describe('Subdevice.getFeatures', () => {
  before(async () => {
    // @ts-ignore
    device = global.FRIDAY.device;
  });

  it('should get features from valid device', async () => {
    let message = 'no-error';
    try {
      const thatDevice = await device.getById('28500f8d-40d3-4b66-84e2-356fa93c997e');
      const features = await getAvailableFeatures(thatDevice.type!, thatDevice.subType!);

      expect(features).to.be.an('object');

      assert.deepEqual(features, {
        POWER_OFF: 'powerOff',
        POWER_ON: 'powerOn',
      });
      expect(features).not.to.have.property('SET_HUE');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('no-error');
  });

  it('should not get features from non valid device', async () => {
    let message = 'no-error';
    try {
      const thatDevice = await device.getById('5e7383ed-4bef-471a-a96b-9277cab75c34');
      await getAvailableFeatures(thatDevice.type!, thatDevice.subType!);
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('This device has no information about his type or subtype');
  });

  it('should not get features when subtype not exist on type device', async () => {
    let message = 'no-error';
    try {
      await getAvailableFeatures('LIGHT', 'test');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('test is not part of the subdevices available in the device LIGHT');
  });

  it('should not get features when type is not available', async () => {
    let message = 'no-error';
    try {
      await getAvailableFeatures('LIGHTE', 'SIMPLE');
    } catch (e) {
      message = e.message;
    }
    expect(message).equal('LIGHTE is not part of the available devices');
  });
});
