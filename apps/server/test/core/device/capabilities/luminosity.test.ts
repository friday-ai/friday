import sinon from 'sinon';
import { expect } from 'chai';
import { DevicesActions } from '@friday-ai/shared';
import { EventsType } from '../../../../src/config/constants';
import wait from '../../../utils/timer';

describe('Device.luminosity', () => {
  it('should set luminosity', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActions.SET_LUMINOSITY, {
      id: 'fe8d3c87-0927-49ce-a19b-bacd78754880',
      value: 3200,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal('{"device":"SENSOR-30","method":"action.devices.commands.set_luminosity","params":{"value":3200}}');
  });
});
