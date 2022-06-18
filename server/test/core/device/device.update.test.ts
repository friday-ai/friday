import { assert, expect } from 'chai';
import Device from '../../../src/core/device/device';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Event from '../../../src/utils/event';
import State from '../../../src/core/state/state';
import Variable from '../../../src/core/variable/variable';

describe('Device.update', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const device = new Device(event, state);

  it('should update a device', async () => {
    const updatedDevice = await device.update('22b5b9ce-cd9e-404a-8c31-97350d684fd3', {
      name: 'Device update',
    });

    expect(updatedDevice.name).to.equal('Device update');
  });

  it('should not found device to update', async () => {
    const promise = device.update('449b2033-105f-4c18-91e8-a56ad1831796', {});

    await assert.isRejected(promise, NotFoundError);
  });
});
