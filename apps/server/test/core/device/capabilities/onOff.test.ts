import { DevicesActions } from '@friday-ai/shared';
import { expect } from 'chai';
import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.onOff', () => {
  it('should set on', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.TURN_ON, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: 1,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","capability":"switch-onoff","method":"action.devices.commands.turn_on","params":{"value":1}}'
    );
  });

  it('should set on with boolean true', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.TURN_ON, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: true,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","capability":"switch-onoff","method":"action.devices.commands.turn_on","params":{"value":true}}'
    );
  });

  it('should set off', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.TURN_ON, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: 0,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","capability":"switch-onoff","method":"action.devices.commands.turn_off","params":{"value":0}}'
    );
  });

  it('should set off with boolean false', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.TURN_ON, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: false,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","capability":"switch-onoff","method":"action.devices.commands.turn_off","params":{"value":false}}'
    );
  });

  it('should not set on with wrong value', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_BRIGHTNESS, {
      id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
      value: 110,
    });

    expect(listener.called).equal(false);
  });

  it('should not set on with wrong capability id', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_BRIGHTNESS, {
      id: 'wrong',
      value: 66,
    });

    expect(listener.called).equal(false);
  });
});
