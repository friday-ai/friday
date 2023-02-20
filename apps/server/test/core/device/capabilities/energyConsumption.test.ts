import sinon from 'sinon';
import { expect } from 'chai';
import { DevicesActions } from '@friday-ai/shared';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.energyConsumption', () => {
  it('should set power', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_POWER_CONSUMPTION, {
      id: '6252b82d-5c45-48c1-8938-4f066a3c8028',
      value: 25,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-20","capability":"sensor-power","method":"action.devices.commands.set_power_consumption","params":{"value":25}}'
    );
  });

  it('should set intensity', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_INTENSITY_CONSUMPTION, {
      id: 'fe0a0a04-986a-455d-94f0-b710c6944014',
      value: 10,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-20","capability":"sensor-intensity","method":"action.devices.commands.set_intensity_consumption","params":{"value":10}}'
    );
  });

  it('should set water', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_WATER_CONSUMPTION, {
      id: 'e3b066ee-7974-4d92-9587-cd113f26c4f4',
      value: 1,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-20","capability":"sensor-water","method":"action.devices.commands.set_water_consumption","params":{"value":1}}'
    );
  });
});
