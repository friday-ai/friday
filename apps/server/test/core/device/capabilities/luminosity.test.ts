import sinon from 'sinon';
import { EventsType } from '../../../../src/config/constants';
import { DevicesActionsType } from '../../../../src/config/device';
import wait from '../../../utils/timer';
import { expect } from 'chai';

describe('Device.luminosity', () => {
  it('should set luminosity', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    global.FRIDAY.event.emit(DevicesActionsType.SET_LUMINOSITY, {
      id: 'fe8d3c87-0927-49ce-a19b-bacd78754880',
      value: 3200,
    });

    await wait(80);
    expect(listener.called).equal(true);
    expect(listener.args[0][0].message).to.equal(
      '{"device":"SENSOR-30","method":"action.devices.commands.set_luminosity","params":{"value":3200}}',
    );
  });
});
