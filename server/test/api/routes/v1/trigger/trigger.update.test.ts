import TestServer from '../../../../utils/testServer';
describe('trigger.update', () => {
  it('should update a trigger', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514')
      .send({
        name: 'Trigger update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Trigger update');
      });
  });

  it('should not found trigger to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/scene/a0f02b72-73e0-4cfd-a049-5caaa0b8333')
      .send({
        name: 'Trigger update'
      })
      .expect(404);

  });
});
