import { assert, expect } from 'chai';
import Device from '../../../src/core/device/device';
import { NotFoundError } from '../../../src/utils/decorators/error';

let device: Device;

describe('Device.update', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should update a device', async () => {
    const updatedDevice = await device.update('22b5b9ce-cd9e-404a-8c31-97350d684fd3', {
      name: 'Device update',
    });

    expect(updatedDevice.name).to.equal('Device update');
  });

  it('should not found device to update', async () => {
    const promise = device.update('39144f78-36e7-4c8b-88d1-b42dead53a09', {
      name: 'Device update',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
