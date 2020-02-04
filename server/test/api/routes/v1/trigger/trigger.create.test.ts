import TestServer from "../../../../utils/helper";
import {AvailableConditions} from "../../../../../src/utils/constants";

describe('trigger.create', () => {
  it('should create a trigger', async () => {
    const server = await new TestServer();

    await server
      .post('/api/v1/trigger')
      .send({
        id: '28c59bd7-a559-41bb-8b5e-a3670001a7bb',
        name: 'Test Trigger 2',
        description: 'A trigger for a test :)',
        type: AvailableConditions.DEVICE_VALUE,
        rules: JSON.stringify({
          device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
          value: '23'
        })
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ["id", "name", "description", "type", "rules", "updatedAt", "createdAt"]
        );
        expect(
          body.id === '28c59bd7-a559-41bb-8b5e-a3670001a7bb' &&
          body.name === 'Test Trigger 2' &&
          body.description === 'A trigger for a test :)' &&
          body.type === AvailableConditions.DEVICE_VALUE &&
          JSON.parse(body.rules).device === 'cc306435-eb0f-455c-b79d-a684b171e04d' &&
          JSON.parse(body.rules).value === '23'
        ).toEqual(true);
      });
  });

  it('should not create a trigger with an empty name', async () => {
    const server = await new TestServer();

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
