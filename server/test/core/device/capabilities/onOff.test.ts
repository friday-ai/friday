import { expect } from 'chai';
import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';
import { DevicesActionsType } from '../../../../src/config/device';

describe('Device.onOff', () => {
  it('should set on', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.TURN_ON, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: 66,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.turn_on","params":{}}',
    );
  });

  it('should not set on with wrong capability id', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.SET_BRIGHTNESS, {
      id: 'wrong',
      value: 66,
    });

    expect(listener.called).equal(false);
  });
});
