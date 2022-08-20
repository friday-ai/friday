import { assert, expect } from 'chai';
import Device from '../../../src/core/device/device';
import {
  BadParametersError,
  DatabaseValidationError,
} from '../../../src/utils/decorators/error';

let device: Device;

describe('Device.setCapabilitySettings', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should set a capability settings', async () => {
    const newSettings = await device.setCapabilitySettings('2e6a90de-b05c-47ca-8895-59b23953531c', {
      min: 0,
      max: 100,
      step: 1,
    });

    expect(newSettings).to.be.an('object');
    expect(newSettings.settings?.min).to.equal(0);
    expect(newSettings.settings?.max).to.equal(100);
    expect(newSettings.settings?.step).to.equal(1);
  });

  it('should not set a capability settings with empty capability id', async () => {
    const promise = device.setCapabilitySettings('', {
      min: 0,
      max: 100,
      step: 1,
    });

    await assert.isRejected(promise, BadParametersError);
  });

  it('should not set a capability settings with wrong capability id', async () => {
    const promise = device.setCapabilitySettings('c16c4f35-fb7a-45dd-82bf-b80c97589509', {
      min: 0,
      max: 100,
      step: 1,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
