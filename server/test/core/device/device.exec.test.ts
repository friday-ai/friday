import { assert, expect } from 'chai';
import sinon from 'sinon';
import Device from '../../../src/core/device/device';
import { NotFoundError } from '../../../src/utils/decorators/error';
import { EventsType } from '../../../src/config/constants';
import wait from '../../utils/timer';
import { DevicesActionsType } from '../../../src/config/device';

let device: Device;

describe('Device.exec', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should exec a device action', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await device.exec('22b5b9ce-cd9e-404a-8c31-97350d684fd3', { action: DevicesActionsType.TURN_ON, params: {} });

    await wait(20);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"LIGHT-10","method":"action.devices.commands.turn_on","params":{}}');
  });

  it('should not exec a device action with wrong device id', async () => {
    const promise = device.exec('wrong', { action: DevicesActionsType.TURN_ON, params: {} });
    await assert.isRejected(promise, NotFoundError);
  });
});
