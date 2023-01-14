import { expect } from 'chai';
import sinon from 'sinon';
import { DevicesActions } from '@friday/shared';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.brightness', () => {
  it('should set brightness', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_BRIGHTNESS, {
      id: '2e6a90de-b05c-47ca-8895-59b23953531c',
      value: 66,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"LIGHT-10","method":"action.devices.commands.set_brightness","params":{"value":66}}');
  });

  it('should not set brightness with wrong value', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_BRIGHTNESS, {
      id: '2e6a90de-b05c-47ca-8895-59b23953531c',
      value: 110,
    });

    expect(listener.called).equal(false);
  });

  it('should not set brightness with wrong capability id', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_BRIGHTNESS, {
      id: 'wrong',
      value: 66,
    });

    expect(listener.called).equal(false);
  });
});
