import { expect, assert } from 'chai';
import Device from '../../../src/core/device';
import { NotFoundError } from '../../../src/utils/errors/coreError';
import Event from '../../../src/utils/event';
import State from '../../../src/core/state';
import Variable from '../../../src/core/variable';

describe('Device.update', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const device = new Device(event, state);

  it('should update a device', async () => {
    const updatedDevice = await device.update('22b5b9ce-cd9e-404a-8c31-97350d684fd3', {
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Device update',
    });

    expect(updatedDevice.name).to.equal('Device update');
  });

  it('should not found device to update', async () => {
    const promise = device.update('449b2033-105f-4c18-91e8-a56ad1831796', {
      id: '449b2033-105f-4c18-91e8-a56ad1831796',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
