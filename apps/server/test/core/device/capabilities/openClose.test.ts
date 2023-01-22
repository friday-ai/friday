import sinon from 'sinon';
import { expect } from 'chai';
import { DevicesActions } from '@friday-ai/shared';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.openclose', () => {
  it('should set open door', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.OPEN, {
      id: '8e90fc03-2487-4c96-bec0-f2c73c73168a',
      value: true,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"SENSOR-10","method":"action.devices.commands.open","params":{"value":true}}');
  });

  it('should set close door', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.CLOSE, {
      id: '8e90fc03-2487-4c96-bec0-f2c73c73168a',
      value: false,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"SENSOR-10","method":"action.devices.commands.close","params":{"value":false}}');
  });

  it('should not set open with wrong value', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.OPEN, {
      id: '8e90fc03-2487-4c96-bec0-f2c73c73168a',
      value: 110,
    });

    expect(listener.called).equal(false);
  });
});
