import { assert } from 'chai';
import Device from '../../../src/core/device/device';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable/variable';
import State from '../../../src/core/state/state';

describe('Device.destroy', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const device = new Device(event, state);

  it('should destroy a device', async () => {
    await device.destroy('22b5b9ce-cd9e-404a-8c31-97350d684fd3');
  });

  it('should not found a device to destroy', async () => {
    const promise = device.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
