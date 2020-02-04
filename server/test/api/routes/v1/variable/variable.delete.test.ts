import TestServer from '../../../../utils/testServer';

describe('variable.delete', () => {
  it('should delete a variable', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found variable to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8333')
      .expect(404);
  });

});
