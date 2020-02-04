import TestServer from '../../../../utils/testServer';
describe('scene.delete', () => {
  it('should delete a scene', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found scene to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed2333')
      .expect(404);
  });

});
