import TestServer from '../../../../utils/testServer';

describe('device.update', () => {
  it('should update a device', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .send({
        name: 'Device update'
      })
      .expect(200)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body.name).toEqual('Device update');
      });
  });

  it('should not found device to update', async () => {
    const server = await new TestServer();

    await server
      .patch('/api/v1/device/449b2033-105f-4c18-91e8-a56ad1831796')
      .send({
        name: 'Action update'
      })
      .expect(404);

  });
});
