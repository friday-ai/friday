import { expect } from 'chai';
import sinon from 'sinon';
import { EventsType } from '../../../../../src/config/constants';
import { DevicesActionsType } from '../../../../../src/config/device';
import server from '../../../../utils/request';
import wait from '../../../../utils/timer';

describe('POST /api/v1/capability/:id', () => {
  it('should set on', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await server
      .post('/api/v1/capability/d39593a9-f54a-4823-8d6c-017be8f57eed')
      .send({
        action: DevicesActionsType.TURN_ON,
        value: 'ON',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (_) => {
        await wait(80);
        expect(listener.called).equal(true);
        expect(listener.args[0][0].message).to.equal(
          '{"device":"LIGHT-10","method":"action.devices.commands.turn_on","params":{}}',
        );
      });
  });

  it('should not set on with wrong capability id', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await server
      .post('/api/v1/capability/wrong')
      .send({
        action: DevicesActionsType.TURN_ON,
        value: null,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((_) => {
        expect(listener.called).equal(false);
      });
  });
});
