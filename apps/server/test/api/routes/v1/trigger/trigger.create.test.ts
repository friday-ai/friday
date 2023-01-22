import { expect, assert } from 'chai';
import { AvailableConditions } from '@friday-ai/shared';
import server from '../../../../utils/request';

describe('POST /api/v1/trigger', () => {
  it('should create a trigger', async () => {
    const trigger = {
      name: 'Test Trigger 2',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
    };

    await server
      .post('/api/v1/trigger')
      .send(trigger)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepInclude(res.body, trigger);
      });
  });

  it('should not create a trigger with a provided id', async () => {
    const trigger = {
      id: 'ad97cb52-b1db-4eb6-8546-d2557529f117',
      name: 'Random trigger',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
    };

    await server
      .post('/api/v1/trigger')
      .send(trigger)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(trigger.id);
        expect(res.body.name).to.equal('Random trigger');
      });
  });

  it('should not create a trigger with an empty name', async () => {
    await server
      .post('/api/v1/trigger')
      .send({
        id: '8a1f51d3-b720-48c1-984a-4d188763396f',
        name: '',
        description: 'A trigger for a test :)',
        type: AvailableConditions.DEVICE_VALUE,
        rules: JSON.stringify({
          device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
          value: '23',
        }),
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
