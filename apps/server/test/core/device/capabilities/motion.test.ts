import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import { DevicesActionsType } from '../../../../src/config/device';
import wait from '../../../utils/timer';
import { expect } from 'chai';

describe('Device.motion', () => {
  it('should set motion true', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.SET_MOTION, {
      id: 'f7710371-928a-4b2e-8a27-b00de697fded',
      value: true,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-30","method":"action.devices.commands.set_motion","params":{"value":true}}',
    );
  });

  it('should set motion false', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.SET_MOTION, {
      id: 'f7710371-928a-4b2e-8a27-b00de697fded',
      value: false,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-30","method":"action.devices.commands.set_motion","params":{"value":false}}',
    );
  });

  it('should not set motion with bad value', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.SET_MOTION, {
      id: 'f7710371-928a-4b2e-8a27-b00de697fded',
      value: 'BAD_VALUE',
    });

    await wait(80);
    expect(listener.called).equal(false);
  });
});
