import TestServer from "../../../../utils/helper";

describe('trigger.getAll', () => {
  it('should return all triggers', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/trigger')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
            name: 'Test',
            description: 'A trigger test',
            type: 'device.value',
            rules: JSON.stringify({
              device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
              value: '23'
            })
          }
        ]);
      });
  });

  it('should return all triggers with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/trigger')
      .query({
        scope: "full"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
            name: 'Test',
            description: 'A trigger test',
            type: 'device.value',
            rules: JSON.stringify({
              device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
              value: '23'
            }),
            scenes: [
              {
                id: '2452964a-a225-47dd-9b83-d88d57ed280e',
                name: 'Test scene',
                description: 'A scene for the tests ;) ',
                triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
              }
            ]
          }
        ]);
      });
  });
});
