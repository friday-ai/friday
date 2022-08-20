import { assert, expect } from 'chai';
import Device from '../../../src/core/device/device';
import {
  BadParametersError,
  DatabaseValidationError,
} from '../../../src/utils/decorators/error';
import { DevicesCapabilityType } from '../../../src/config/device';

let device: Device;

describe('Device.setCapability', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should set a capability', async () => {
    const newCapability = await device.setCapability('14541459-2672-4755-b57a-6c6955b47f17', {
      defaultName: 'New capability for test',
      type: DevicesCapabilityType.BRIGHTNESS,
    });

    expect(newCapability).to.be.an('object');
    expect(newCapability.defaultName).to.equal('New capability for test');
  });

  it('should not set a capability with empty device id', async () => {
    const promise = device.setCapability('', {
      defaultName: 'New capability for test',
      type: DevicesCapabilityType.BRIGHTNESS,
    });

    await assert.isRejected(promise, BadParametersError);
  });

  it('should not set a capability with wrong device id', async () => {
    const promise = device.setCapability('c16c4f35-fb7a-45dd-82bf-b80c97589509', {
      defaultName: 'New capability for test',
      type: DevicesCapabilityType.BRIGHTNESS,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});