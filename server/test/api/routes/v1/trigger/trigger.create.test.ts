import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { AvailableConditions } from '../../../../../src/utils/constants';

describe('POST /api/v1/trigger', () => {
  it('should create a trigger', async () => {

    const trigger = {
      id: '28c59bd7-a559-41bb-8b5e-a3670001a7bb',
      name: 'Test Trigger 2',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23'
      })
    };

    await server
      .post('/api/v1/trigger')
      .send(trigger)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, trigger);
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
          value: '23'
        })
      })
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
