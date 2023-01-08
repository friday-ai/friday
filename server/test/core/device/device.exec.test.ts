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

    await device.exec('d4b11be4-30fa-4bc4-9b65-482d5c63c0bc', { action: DevicesActionsType.TURN_ON, params: { value: 1 } });

    await wait(20);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"LIGHT-10","method":"action.devices.commands.turn_on","params":{"value":1}}');
  });

  it('should not exec a device action with wrong capability id', async () => {
    const promise = device.exec('wrong', { action: DevicesActionsType.TURN_ON, params: {} });
    await assert.isRejected(promise, NotFoundError);
  });
});
