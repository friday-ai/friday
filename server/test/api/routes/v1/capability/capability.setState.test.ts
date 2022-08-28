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
        value: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (_) => {
        await wait(80);
        expect(listener.called).equal(true);
        expect(listener.args[0][0].message).to.equal(
          '{"device":"LIGHT-10","method":"action.devices.commands.turn_on","params":{"value":true}}',
        );
      });
  });

  it('should set off', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await server
      .post('/api/v1/capability/d39593a9-f54a-4823-8d6c-017be8f57eed')
      .send({
        action: DevicesActionsType.TURN_OFF,
        value: false,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (_) => {
        await wait(80);
        expect(listener.called).equal(true);
        expect(listener.args[0][0].message).to.equal(
          '{"device":"LIGHT-10","method":"action.devices.commands.turn_off","params":{"value":false}}',
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
        value: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((_) => {
        expect(listener.called).equal(false);
      });
  });

  it('should not set on with wrong boolean', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await server
      .post('/api/v1/capability/d39593a9-f54a-4823-8d6c-017be8f57eed')
      .send({
        action: DevicesActionsType.TURN_ON,
        value: 2,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (_) => {
        await wait(80);
        expect(listener.called).equal(false);
      });
  });

  it('should not set cold with wrong boolean', async () => {
    const listener = sinon.spy();
    global.FRIDAY.event.on(EventsType.MQTT_PUBLISH, listener);

    await server
      .post('/api/v1/capability/c0afdcbd-7d11-479f-a946-57107504295c')
      .send({
        action: DevicesActionsType.COLD,
        value: 2,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(async (_) => {
        await wait(80);
        expect(listener.called).equal(false);
      });
  });
});
