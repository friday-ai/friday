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
            id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
            value: { red: 10, green: 224, blue: 0},
        });

        await wait(80);
        expect(listener.called).equal(true);
        expect(listener.args[0][0].message).to.equal(
            '{"device":"LIGHT-10","method":"action.devices.commands.color","params":{ \'10, 224, 0\'}}',
        );
    });
});
