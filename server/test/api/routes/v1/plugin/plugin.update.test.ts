import TestServer from '../../../../utils/testServer';

describe('plugin.update', () => {
  it('should update a plugin', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .send({
        name: 'Plugin update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Plugin update');
      });
  });

  it('should not found plugin to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .send({
        name: 'Plugin update'
      })
      .expect(404);

  });
});
