import { DevicesActions } from '@friday-ai/shared';
import { expect } from 'chai';
import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.temperatureHumidity', () => {
  it('should set temperature', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_TEMPERATURE, {
      id: '5ed78e9c-25ed-44cb-b769-6292f9090023',
      value: 25,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-10","capability":"sensor-temp","method":"action.devices.commands.set_temperature","params":{"value":25}}'
    );
  });

  it('should set humidity', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_HUMIDITY, {
      id: '969ae42a-7180-43ca-b234-e2111a206cd9',
      value: 50,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-10","capability":"sensor-humidity","method":"action.devices.commands.set_humidity","params":{"value":50}}'
    );
  });
});
