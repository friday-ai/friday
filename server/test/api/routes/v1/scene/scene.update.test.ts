import TestServer from '../../../../utils/testServer';

describe('scene.update', () => {
  it('should update a scene', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .send({
        name: 'Scene update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Scene update');
      });
  });

  it('should not found scene to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed2333')
      .send({
        name: 'Scene update'
      })
      .expect(404);

  });
});
