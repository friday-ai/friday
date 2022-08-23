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
      value: '10, 224, 0',
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"LIGHT-10","method":"action.devices.commands.color","params":{"value":"10, 224, 0"}}',
    );
  });

  it('should not change color', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.COLOR, {
      id: 'fake',
      value: '10, 224, 0',
    });

    await wait(80);
    expect(listener.called).equal(false);
  });
});
