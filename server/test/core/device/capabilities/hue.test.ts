import { expect } from 'chai';
import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';
import { DevicesActionsType } from '../../../../src/config/device';

describe('Device.color', () => {
  it('should change color', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR, {
      id: '9da3f67d-37b9-498d-bc48-efb45c60591a',
      value: {
        red: 10,
        green: 224,
        blue: 0,
      },
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.color","params":{"value":"10, 224, 0"}}',
    );
  });

  it('should not change color, param rgb error', async () => {
    const listener = sinon.spy();

    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR, {
      id: '9da3f67d-37b9-498d-bc48-efb45c60591a',
      value: {
        red: 10,
        green: 224,
        blue: null,
      },
    });

    await wait(80);
    expect(listener.called).equal(false);
  });

  it('should not change color, range error', async () => {
    const listener = sinon.spy();

    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR, {
      id: '9da3f67d-37b9-498d-bc48-efb45c60591a',
      value: {
        red: 10,
        green: 224,
        blue: 3000,
      },
    });

    await wait(80);
    expect(listener.called).equal(false);
  });

  it('should not change color', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR, {
      id: 'fake',
      value: {
        red: 10,
        green: 224,
        blue: 0,
      },
    });

    await wait(80);
    expect(listener.called).equal(false);
  });

  it('should change to cold white', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLD, {
      id: 'c0afdcbd-7d11-479f-a946-57107504295c',
      value: 1,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.cold","params":{"value":1}}',
    );
  });

  it('should make error to change cold or warm white', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLD, {
      id: 'c0afdcbd-7d11-479f-a946-57107504295c',
      value: null,
    });

    await wait(80);
    expect(listener.called).equal(false);
  });

  it('should change to warm white', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.WARM, {
      id: 'c0afdcbd-7d11-479f-a946-57107504295c',
      value: 0,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.warm","params":{"value":0}}',
    );
  });

  it('should change to color temperature', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR_TEMP, {
      id: '2808a1f3-a6a1-407b-a936-db71d74b8a30',
      value: 2300,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.color_temp","params":{"value":2300}}',
    );
  });

  it('should change to white color', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.WHITE, {
      id: 'b2250d79-4d9f-4b5f-a02c-3600950f8b94',
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.white","params":{"value":"255, 255, 255"}}',
    );
  });
});
