import TestServer from '../../../../utils/testServer';

describe('device.delete', () => {
  it('should delete a device', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .expect(200)
      .then((res) => {
        expect(res.body.success).toEqual(true);
      });
  });

  it('should not found device to delete', async () => {
    const server = await new TestServer();

    await server
      .delete('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684333')
      .expect(404);
  });

});
