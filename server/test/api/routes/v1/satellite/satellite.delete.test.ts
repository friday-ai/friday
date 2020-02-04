import TestServer from '../../../../utils/testServer';

describe('satellite.delete', () => {
  it('should delete a satellite', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found satellite to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894333')
      .expect(404);
  });

});
